/**
 * GoHighLevel API Integration
 * Handles contact creation, opportunity creation, and custom field updates
 * 
 * NOTE: Uses Private Integration Token (250+ chars), NOT old API Key (40 chars)
 * See: https://marketplace.gohighlevel.com/docs/Authorization/PrivateIntegrationsToken
 */

import { retryWithBackoff } from './utils/retry.js'
import { fetchWithTimeout } from './utils/timeout.js'
import { GHLAPIError, handleGHLResponse } from './utils/ghlErrorHandler.js'
import { getCachedFieldKeys } from './utils/fieldKeyCache.js'
import { ghlRateLimiter } from './utils/rateLimiter.js'
import { validateContactData, validateOpportunityData } from './utils/ghlValidation.js'

const GHL_API_URL = process.env.GHL_API_URL || 'https://services.leadconnectorhq.com'
const GHL_API_KEY = process.env.GHL_API_KEY // Should be Private Integration Token (250+ chars)
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID
const GHL_PIPELINE_ID = process.env.GHL_PIPELINE_ID
const GHL_STAGE_ID = process.env.GHL_STAGE_ID
const GHL_REQUEST_TIMEOUT = parseInt(process.env.GHL_REQUEST_TIMEOUT || '30000', 10)

if (!GHL_API_KEY || !GHL_LOCATION_ID) {
  console.warn('GHL_API_KEY (Private Integration Token) and GHL_LOCATION_ID must be set in environment variables')
}

// Note: Private Integration Tokens can vary in length
// Some are 40 characters (starting with "pit-"), others are 250+ characters
// Both formats are valid as long as they're Private Integration Tokens

/**
 * Generate a unique field key from a field name
 * Converts "Business Name" to "business_name" or "websiteGoals" to "website_goals"
 * @param {string} fieldName - The field name from the survey
 * @returns {string} - Unique snake_case key
 */
function generateFieldKey(fieldName) {
  // Convert camelCase to snake_case
  return fieldName
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '')
    .replace(/[^a-z0-9_]/g, '_')
    .replace(/_+/g, '_')
}

/**
 * Fetch and map GHL custom field names to their actual GHL-generated keys
 * Uses caching to reduce API calls
 * @param {string} entity - Entity type: 'contact' or 'opportunity'
 * @returns {Promise<Map>} - Map of field name to GHL key (e.g., "Web_Form_Website_Goals" -> "contact.web_form_website_goals")
 */
async function fetchGHLFieldKeys(entity = 'contact') {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    return new Map()
  }

  // Use cached field keys with automatic refresh
  return getCachedFieldKeys(entity, async () => {
    const fieldMap = new Map()
    
    try {
      // Wait for rate limit slot
      await ghlRateLimiter.waitForSlot()
      
      // Fetch with retry and timeout
      // GHL API v2: Custom fields endpoint - entity might be in path or not needed
      const response = await retryWithBackoff(async () => {
        // Try without entity parameter first (some GHL versions don't need it)
        return await fetchWithTimeout(
          `${GHL_API_URL}/locations/${GHL_LOCATION_ID}/customFields`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${GHL_API_KEY}`,
              'Content-Type': 'application/json',
              'Version': '2021-07-28'
            }
          },
          GHL_REQUEST_TIMEOUT
        )
      })

      await handleGHLResponse(response, { entity, operation: 'fetchFieldKeys' })
      const data = await response.json()
      // GHL API returns fields differently - check both structures
      // Also check if fields are nested by entity type
      let fields = data.customFields || data[`${entity}CustomFields`] || data.fields || []
      
      // If we have folders, also check fields inside folders
      if (data.folders && Array.isArray(data.folders)) {
        data.folders.forEach(folder => {
          if (folder.customFields && Array.isArray(folder.customFields)) {
            fields = fields.concat(folder.customFields)
          }
        })
      }
      
      // Map field names to their GHL-generated keys
      // GHL API returns 'fieldKey' property (not 'key')
      fields.forEach(field => {
        if (field.name && (field.fieldKey || field.key)) {
          fieldMap.set(field.name, field.fieldKey || field.key)
        }
      })
      
      console.log(`📋 Fetched ${fieldMap.size} ${entity} custom field keys`)
    } catch (error) {
      console.warn(`⚠️  Could not fetch ${entity} field keys:`, error.message)
      // Return empty map on error (will try again on next request)
    }

    return fieldMap
  })
}

/**
 * Create or update a contact in GoHighLevel
 * @param {Object} data - Contact data
 * @returns {Promise<Object>} - Created/updated contact
 */
export async function createContact(data) {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    throw new Error('GoHighLevel API credentials not configured')
  }

  // Validate contact data
  validateContactData(data)

  // Owner Contact is stored in firstName field (label is "Owner Contact" in GHL)
  // No need to split - put full name in firstName
  const contactData = {
    firstName: data.ownerContact.trim() || 'New Contact',
    lastName: '', // Not needed - owner contact goes in firstName
    email: data.email || '',
    phone: data.phone,
    companyName: data.businessName || '', // Add business name as standard field
    locationId: GHL_LOCATION_ID, // locationId goes in request body per GHL API v2.0 (only for POST)
    source: data.source || 'Website Survey Form',
    tags: data.tags || ['Website Assessment', 'New Lead']
  }

  // Define all survey fields that should be custom fields in GHL
  // This automatically creates fields based on your survey structure
  // Prefix to make all fields unique and avoid conflicts with existing GHL fields
  // GHL only allows underscores, no spaces or hyphens
  const FIELD_PREFIX = 'Web_Form_'
  
  const surveyFieldDefinitions = [
    // Website Goals (arrays will be joined as comma-separated strings)
    { surveyKey: 'websiteGoals', displayName: `${FIELD_PREFIX}Website_Goals`, type: 'TEXT' },
    
    // Functionality Needs
    { surveyKey: 'functionalityNeeds', displayName: `${FIELD_PREFIX}Functionality_Needs`, type: 'TEXT' },
    { surveyKey: 'otherFeatures', displayName: `${FIELD_PREFIX}Other_Features`, type: 'TEXT' },
    
    // Design & Branding
    { surveyKey: 'hasLogo', displayName: `${FIELD_PREFIX}Has_Logo`, type: 'TEXT' },
    { surveyKey: 'hasBrandColors', displayName: `${FIELD_PREFIX}Has_Brand_Colors`, type: 'TEXT' },
    { surveyKey: 'brandColors', displayName: `${FIELD_PREFIX}Brand_Colors`, type: 'TEXT' },
    { surveyKey: 'designRequests', displayName: `${FIELD_PREFIX}Design_Requests`, type: 'TEXT' },
    { surveyKey: 'preferredFonts', displayName: `${FIELD_PREFIX}Preferred_Fonts`, type: 'TEXT' },
    { surveyKey: 'referenceWebsites', displayName: `${FIELD_PREFIX}Reference_Websites`, type: 'TEXT' },
    
    // Social Media
    { surveyKey: 'linkSocialMedia', displayName: `${FIELD_PREFIX}Link_Social_Media`, type: 'TEXT' },
    { surveyKey: 'facebookLink', displayName: `${FIELD_PREFIX}Facebook_Link`, type: 'TEXT' },
    { surveyKey: 'youtubeLink', displayName: `${FIELD_PREFIX}YouTube_Link`, type: 'TEXT' },
    { surveyKey: 'tiktokLink', displayName: `${FIELD_PREFIX}TikTok_Link`, type: 'TEXT' },
    { surveyKey: 'instagramLink', displayName: `${FIELD_PREFIX}Instagram_Link`, type: 'TEXT' },
    
    // Content & Services
    { surveyKey: 'servicesList', displayName: `${FIELD_PREFIX}Services_List`, type: 'TEXT' },
    { surveyKey: 'businessDescription', displayName: `${FIELD_PREFIX}Business_Description`, type: 'TEXT' },
    { surveyKey: 'specialOffers', displayName: `${FIELD_PREFIX}Special_Offers`, type: 'TEXT' },
    
    // Domain & Hosting
    { surveyKey: 'hasWebsite', displayName: `${FIELD_PREFIX}Has_Website`, type: 'TEXT' },
    { surveyKey: 'domainName', displayName: `${FIELD_PREFIX}Domain_Name`, type: 'TEXT' },
    { surveyKey: 'needDomainHelp', displayName: `${FIELD_PREFIX}Need_Domain_Help`, type: 'TEXT' },
    
    // Business Basics (businessName goes to standard field, but we can also add as custom)
    { surveyKey: 'businessAddress', displayName: `${FIELD_PREFIX}Business_Address`, type: 'TEXT' },
    
    // Legal / Copyright
    { surveyKey: 'needContentWriting', displayName: `${FIELD_PREFIX}Need_Content_Writing`, type: 'TEXT' },
    { surveyKey: 'hasLegalRequirements', displayName: `${FIELD_PREFIX}Has_Legal_Requirements`, type: 'TEXT' },
    { surveyKey: 'privacyPolicy', displayName: `${FIELD_PREFIX}Privacy_Policy`, type: 'CHECKBOX' },
    { surveyKey: 'disclaimer', displayName: `${FIELD_PREFIX}Disclaimer`, type: 'CHECKBOX' },
    { surveyKey: 'terms', displayName: `${FIELD_PREFIX}Terms`, type: 'CHECKBOX' },
    { surveyKey: 'agreeToTerms', displayName: `${FIELD_PREFIX}Agree_to_Terms`, type: 'CHECKBOX' },
    
    // GHL File Upload URLs
    { surveyKey: 'ghlFileUrls', displayName: `${FIELD_PREFIX}GHL_File_URLs`, type: 'TEXT' }
  ]

  // Note: Custom fields should already exist in GHL
  // Skip field creation to speed up form submissions
  
  // Build custom fields ARRAY from survey data
  // GHL API v2 expects customFields as an array: [{ key: "...", field_value: "..." }]
  // GHL contact fields use "contact.field_name" format
  const customFieldsArray = []
  
  console.log('🔍 Processing custom fields...')
  console.log('   Available data keys:', Object.keys(data))
  
  surveyFieldDefinitions.forEach(fieldDef => {
    // Construct the contact key directly from the display name
    // GHL expects just the field key without entity prefix: "web_form_field_name"
    const ghlKey = fieldDef.displayName.toLowerCase().replace(/[^a-z0-9]+/g, '_')
    
    const value = data[fieldDef.surveyKey]
    
    console.log(`   Processing field: ${fieldDef.surveyKey} -> ${ghlKey}`)
    
    if (value !== undefined && value !== null && value !== '') {
      // Handle arrays (join with comma)
      if (Array.isArray(value)) {
        const filtered = value.filter(v => v)
        if (filtered.length > 0) {
          const fieldValue = filtered.join(', ')
          customFieldsArray.push({ key: ghlKey, field_value: fieldValue })
          console.log(`   ✅ ${ghlKey} = "${fieldValue}"`)
        }
      }
      // Handle booleans - GHL checkboxes need "Yes" or "No"
      else if (typeof value === 'boolean') {
        const fieldValue = value ? 'Yes' : 'No'
        customFieldsArray.push({ key: ghlKey, field_value: fieldValue })
        console.log(`   ✅ ${ghlKey} = "${fieldValue}"`)
      }
      // Handle string booleans (from form submissions) - convert to "Yes"/"No" for checkboxes
      else if (fieldDef.type === 'CHECKBOX' || (typeof value === 'string' && (value === 'true' || value === 'false'))) {
        const fieldValue = (value === true || value === 'true' || value === 'True') ? 'Yes' : 'No'
        customFieldsArray.push({ key: ghlKey, field_value: fieldValue })
        console.log(`   ✅ ${ghlKey} = "${fieldValue}" (checkbox)`)
      }
      // Handle strings and other values
      else {
        const stringValue = String(value).trim()
        if (stringValue !== '') {
          customFieldsArray.push({ key: ghlKey, field_value: stringValue })
          console.log(`   ✅ ${ghlKey} = "${stringValue}"`)
        }
      }
    }
  })

  // Add business name as custom field (in addition to standard field)
  if (data.businessName) {
    const businessNameKey = `${FIELD_PREFIX.toLowerCase()}business_name`
    // Only add if not already in the array
    if (!customFieldsArray.find(f => f.key === businessNameKey)) {
      customFieldsArray.push({ key: businessNameKey, field_value: data.businessName })
    }
  }

  if (customFieldsArray.length > 0) {
    contactData.customFields = customFieldsArray
  }

  // Add logging to see what's being sent
  console.log('📞 Contact Data Being Sent:')
  console.log('   First Name:', contactData.firstName)
  console.log('   Email:', contactData.email)
  console.log('   Phone:', contactData.phone)
  console.log('   Custom Fields Count:', contactData.customFields ? contactData.customFields.length : 0)
  console.log('   Custom Fields:', JSON.stringify(contactData.customFields, null, 2))

  try {
    // Wait for rate limit slot
    await ghlRateLimiter.waitForSlot()
    
    // First, try to find existing contact by email or phone
    // GHL API v2: Skip search for now - will handle duplicates via error response
    // Search endpoints have different formats and may not be available in all GHL versions
    let contactId = null
    // Note: We'll rely on duplicate contact error handling instead of pre-search
    // This is more reliable across different GHL API versions

    // Wait for rate limit slot before create/update
    await ghlRateLimiter.waitForSlot()

    // Create or update contact
    // Per GHL API v2.0: 
    // - For POST (create): locationId goes in request body
    // - For PUT (update): locationId should NOT be in request body
    const url = contactId
      ? `${GHL_API_URL}/contacts/${contactId}`
      : `${GHL_API_URL}/contacts/`

    const method = contactId ? 'PUT' : 'POST'
    
    // Prepare request body - remove locationId for PUT requests
    const requestBody = { ...contactData }
    if (method === 'PUT') {
      delete requestBody.locationId
    }

    const response = await retryWithBackoff(async () => {
      return await fetchWithTimeout(
        url,
        {
          method,
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Content-Type': 'application/json',
            'Version': '2021-07-28'
          },
          body: JSON.stringify(requestBody)
        },
        GHL_REQUEST_TIMEOUT
      )
    })

    try {
      await handleGHLResponse(response, {
        operation: contactId ? 'updateContact' : 'createContact',
        contactId,
        locationId: GHL_LOCATION_ID
      })

      const result = await response.json()
      console.log('✅ Contact Response from GHL:')
      console.log('   Full Response:', JSON.stringify(result, null, 2))
      const returnedContactId = result.contact?.id || result.id || result.contactId
      console.log('   Contact ID:', returnedContactId)
      console.log('   Contact Custom Fields in Response:', JSON.stringify(result.contact?.customFields || result.customFields, null, 2))
      
      // Ensure we return an object with an id property
      const contact = result.contact || result
      if (!contact.id && returnedContactId) {
        contact.id = returnedContactId
      }
      return contact
    } catch (handleError) {
      // Handle duplicate contact error (400) - extract contact ID and update
      if (handleError instanceof GHLAPIError && handleError.status === 400) {
        const errorResponse = handleError.response
        if (typeof errorResponse === 'object' && errorResponse.meta && errorResponse.meta.contactId) {
          const duplicateContactId = errorResponse.meta.contactId
          console.log('⚠️  Duplicate contact detected, updating existing contact:', duplicateContactId)
          
          // Update the existing contact
          // Remove locationId from request body for PUT requests
          const updateContactData = { ...contactData }
          delete updateContactData.locationId
          
          const updateResponse = await retryWithBackoff(async () => {
            return await fetchWithTimeout(
              `${GHL_API_URL}/contacts/${duplicateContactId}`,
              {
                method: 'PUT',
                headers: {
                  'Authorization': `Bearer ${GHL_API_KEY}`,
                  'Content-Type': 'application/json',
                  'Version': '2021-07-28'
                },
                body: JSON.stringify(updateContactData)
              },
              GHL_REQUEST_TIMEOUT
            )
          })
          
          await handleGHLResponse(updateResponse, {
            operation: 'updateContact',
            contactId: duplicateContactId,
            locationId: GHL_LOCATION_ID
          })
          
          const updateResult = await updateResponse.json()
          console.log('✅ Updated existing contact in GHL:')
          console.log('   Full Response:', JSON.stringify(updateResult, null, 2))
          const updatedContactId = updateResult.contact?.id || updateResult.id || updateResult.contactId || duplicateContactId
          console.log('   Contact ID:', updatedContactId)
          
          // Ensure we return an object with an id property
          const updatedContact = updateResult.contact || updateResult
          if (!updatedContact.id && updatedContactId) {
            updatedContact.id = updatedContactId
          }
          return updatedContact
        }
      }
      // Re-throw if not a duplicate contact error
      throw handleError
    }
  } catch (error) {
    if (error instanceof GHLAPIError) {
      console.error('❌ GHL Contact Creation Failed:')
      console.error('   Status:', error.status)
      console.error('   Error:', error.response)
      console.error('   Context:', error.context)
      if (error.status === 403) {
        console.error('   ⚠️  403 Error means: API key was created in a DIFFERENT location!')
        console.error('   Solution: Create API key in location:', GHL_LOCATION_ID)
      }
    }
    console.error('Error creating/updating contact in GHL:', error)
    throw error
  }
}

/**
 * Upload a file to GoHighLevel
 * @param {Buffer} fileBuffer - File buffer
 * @param {string} filename - File name
 * @param {string} mimeType - File MIME type
 * @returns {Promise<string>} - File URL or ID in GHL
 */
export async function uploadFileToGHL(fileBuffer, filename, mimeType) {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    throw new Error('GoHighLevel API credentials not configured')
  }

  try {
    // Wait for rate limit slot
    await ghlRateLimiter.waitForSlot()
    
    // Create FormData for multipart/form-data upload
    // Node.js 18+ has native FormData support
    const formData = new FormData()
    
    // Convert Buffer to Blob for FormData (Node.js FormData may need Blob)
    // Create a Blob from the buffer
    const blob = new Blob([fileBuffer], { type: mimeType || 'application/octet-stream' })
    formData.append('file', blob, filename)
    formData.append('locationId', GHL_LOCATION_ID)

    // Try /medias/upload-file endpoint first (newer API)
    // Note: /medias/upload-file does NOT need locationId in body
    let response
    let endpoint = `${GHL_API_URL}/medias/upload-file`
    
    // Create FormData for medias endpoint (no locationId)
    const formDataMedias = new FormData()
    const blobMedias = new Blob([fileBuffer], { type: mimeType || 'application/octet-stream' })
    formDataMedias.append('file', blobMedias, filename)
    
    try {
      response = await retryWithBackoff(async () => {
        return await fetchWithTimeout(
          endpoint,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${GHL_API_KEY}`,
              'Version': '2021-07-28'
              // Don't set Content-Type - let fetch set it with boundary for multipart/form-data
            },
            body: formDataMedias
          },
          GHL_REQUEST_TIMEOUT * 2 // File uploads may take longer
        )
      })
      
      // If medias endpoint fails, try files endpoint
      if (!response.ok) {
        const errorText = await response.text()
        console.log(`⚠️  /medias/upload-file returned ${response.status}: ${errorText}`)
        console.log(`   Trying /files/ endpoint...`)
        
        const formDataFiles = new FormData()
        const blobFiles = new Blob([fileBuffer], { type: mimeType || 'application/octet-stream' })
        formDataFiles.append('file', blobFiles, filename)
        formDataFiles.append('locationId', GHL_LOCATION_ID)
        
        endpoint = `${GHL_API_URL}/files/?locationId=${GHL_LOCATION_ID}`
        response = await retryWithBackoff(async () => {
          return await fetchWithTimeout(
            endpoint,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${GHL_API_KEY}`,
                'Version': '2021-07-28'
              },
              body: formDataFiles
            },
            GHL_REQUEST_TIMEOUT * 2
          )
        })
      }
    } catch (error) {
      // If medias endpoint throws, try files endpoint
      console.log(`⚠️  /medias/upload-file failed: ${error.message}`)
      console.log(`   Trying /files/ endpoint...`)
      
      const formDataFiles = new FormData()
      const blobFiles = new Blob([fileBuffer], { type: mimeType || 'application/octet-stream' })
      formDataFiles.append('file', blobFiles, filename)
      formDataFiles.append('locationId', GHL_LOCATION_ID)
      
      endpoint = `${GHL_API_URL}/files/?locationId=${GHL_LOCATION_ID}`
      response = await retryWithBackoff(async () => {
        return await fetchWithTimeout(
          endpoint,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${GHL_API_KEY}`,
              'Version': '2021-07-28'
            },
            body: formDataFiles
          },
          GHL_REQUEST_TIMEOUT * 2
        )
      })
    }

    await handleGHLResponse(response, { operation: 'uploadFile', filename })
    const result = await response.json()
    console.log('📁 GHL File Upload Response:', JSON.stringify(result, null, 2))
    
    // GHL can return file info in different formats
    // Based on actual API response: { fileId: "...", url: "...", traceId: "..." }
    // Try multiple possible response structures - check result.url first (most common)
    const fileUrl = result.url || 
                    result.file?.url || 
                    result.file?.fileUrl ||
                    result.fileUrl || 
                    result.uploadedFile?.url ||
                    result.data?.url ||
                    result.data?.fileUrl ||
                    (result.file && typeof result.file === 'string' ? result.file : null)
    
    const fileId = result.file?.id || 
                   result.id || 
                   result.fileId ||
                   result.data?.id
    
    if (fileUrl && fileUrl.startsWith('http')) {
      console.log('   ✅ File URL:', fileUrl)
      return fileUrl
    } else if (fileId) {
      // Construct URL from file ID if we have location ID
      const constructedUrl = `${GHL_API_URL}/files/${fileId}?locationId=${GHL_LOCATION_ID}`
      console.log('   ✅ File ID:', fileId, '-> URL:', constructedUrl)
      return constructedUrl
    } else {
      console.log('   ⚠️  No URL/ID in response, full response:', JSON.stringify(result, null, 2))
      throw new Error(`File upload failed: No URL or ID returned. Response: ${JSON.stringify(result)}`)
    }
  } catch (error) {
    console.error('❌ Error uploading file to GHL:', error.message)
    console.error('   Stack:', error.stack)
    if (error.response) {
      console.error('   Response:', JSON.stringify(error.response, null, 2))
    }
    // Re-throw error instead of returning filename - we want to know if upload fails
    throw error
  }
}

/**
 * Get or create custom field folder in GHL
 * @param {string} folderName - Folder name (e.g., "Website Contact")
 * @param {string} entity - Entity type: 'contact' or 'opportunity'
 * @returns {Promise<string|null>} - Folder ID or null if failed
 */
async function getOrCreateFolder(folderName, entity = 'contact') {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    return null
  }

  try {
    // First, check if folder already exists
    // GHL API v2: Remove entity from query parameter
    const checkResponse = await fetch(
      `${GHL_API_URL}/locations/${GHL_LOCATION_ID}/customFields`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28'
        }
      }
    )

    if (checkResponse.ok) {
      const data = await checkResponse.json()
      // Check in folders array
      const existingFolder = data.folders?.find(f => f.name === folderName)
      if (existingFolder) {
        return existingFolder.id
      }
    }

    // Create the folder if it doesn't exist
    // GHL API v2: Folder creation endpoint format
    const createFolderResponse = await fetch(
      `${GHL_API_URL}/locations/${GHL_LOCATION_ID}/customFields/folders`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28'
        },
        body: JSON.stringify({
          name: folderName,
          entity: entity
        })
      }
    )

    if (createFolderResponse.ok) {
      const folderData = await createFolderResponse.json()
      const folderId = folderData.folder?.id || folderData.id
      console.log(`✅ Created folder "${folderName}" for ${entity}`)
      return folderId
    } else {
      const errorData = await createFolderResponse.text()
      console.warn(`⚠️  Failed to create folder "${folderName}" for ${entity}: ${createFolderResponse.status} - ${errorData}`)
      return null
    }
  } catch (error) {
    console.error(`Error getting/creating folder "${folderName}" for ${entity}:`, error.message)
    return null
  }
}

/**
 * Create custom field in GHL using API
 * @param {string} fieldName - Display name for the field
 * @param {string} fieldType - Field type: 'TEXT' or 'CHECKBOX'
 * @param {string} entity - Entity type: 'contact' or 'opportunity'
 * @param {string} folderName - Optional folder name to create field in (e.g., "Website Contact")
 * @returns {Promise<boolean>} - True if field exists or was created
 */
async function createCustomField(fieldName, fieldType = 'TEXT', entity = 'contact', folderName = null) {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    return false
  }

  try {
    // Get or create folder if specified
    let folderId = null
    if (folderName) {
      folderId = await getOrCreateFolder(folderName, entity)
    }

    // Check if field already exists
    // GHL API v2: Remove entity from query, it might be in body or not needed
    const checkResponse = await fetch(
      `${GHL_API_URL}/locations/${GHL_LOCATION_ID}/customFields`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28'
        }
      }
    )

    if (checkResponse.ok) {
      const fields = await checkResponse.json()
      const existingField = fields.customFields?.find(f => f.name === fieldName)
      if (existingField) {
        return true // Field already exists in this entity
      }
    }
    // If check fails, continue to try creating (might be temporary issue)

    // Create the field
    const requestBody = {
      name: fieldName,
      dataType: fieldType === 'CHECKBOX' ? 'CHECKBOX' : 'TEXT'
    }
    
    // Add folderId if folder was created/found
    if (folderId) {
      requestBody.folderId = folderId
    }
    
    // CHECKBOX fields require options array
    if (fieldType === 'CHECKBOX') {
      requestBody.options = ['Yes', 'No']
    }
    
    // GHL API v2: Add entity to request body, not query parameter
    const createRequestBody = {
      ...requestBody,
      entity: entity
    }
    
    const createResponse = await fetch(
      `${GHL_API_URL}/locations/${GHL_LOCATION_ID}/customFields`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28'
        },
        body: JSON.stringify(createRequestBody)
      }
    )

    if (createResponse.ok) {
      console.log(`✅ Created ${entity} custom field: ${fieldName}${folderName ? ` (in folder: ${folderName})` : ''}`)
      return true
    } else {
      const errorData = await createResponse.text()
      // If field already exists (400 with "already exists"), treat as success
      if (createResponse.status === 400 && errorData.includes('already exists')) {
        console.log(`ℹ️  ${entity} custom field ${fieldName} already exists (or key conflict)`)
        return true // Treat as success since field exists
      }
      console.warn(`⚠️  Failed to create ${entity} custom field ${fieldName}: ${createResponse.status} - ${errorData}`)
      return false
    }
  } catch (error) {
    console.error(`Error creating ${entity} custom field ${fieldName}:`, error.message)
    return false
  }
}

/**
 * Get pipelines and stages from GoHighLevel
 * @returns {Promise<Object>} - Pipelines and stages data
 */
export async function getPipelines() {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    throw new Error('GoHighLevel API credentials not configured')
  }

  try {
    // Wait for rate limit slot
    await ghlRateLimiter.waitForSlot()
    
    const response = await retryWithBackoff(async () => {
      return await fetchWithTimeout(
        `${GHL_API_URL}/pipelines/?locationId=${GHL_LOCATION_ID}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Content-Type': 'application/json',
            'Version': '2021-07-28'
          }
        },
        GHL_REQUEST_TIMEOUT
      )
    })

    await handleGHLResponse(response, { operation: 'getPipelines' })
    const result = await response.json()
    return result.pipelines || result
  } catch (error) {
    console.error('Error fetching pipelines from GHL:', error)
    throw error
  }
}

/**
 * Create or ensure contact custom field exists
 * @param {string} fieldKey - The field key (generated from survey field name)
 * @param {string} fieldName - Display name for the field
 * @param {string} fieldType - Field type: 'TEXT', 'DROPDOWN', 'DATE', 'NUMBER', 'CHECKBOX'
 * @returns {Promise<boolean>} - True if field exists or was created
 */
async function ensureContactCustomField(fieldName, fieldType = 'TEXT') {
  return createCustomField(fieldName, fieldType, 'contact', 'Website Contact')
}

/**
 * Create or ensure opportunity custom field exists
 * @param {string} fieldKey - The field key (without 'contact.' prefix)
 * @param {string} fieldName - Display name for the field
 * @param {string} fieldType - Field type: 'TEXT', 'DROPDOWN', 'DATE', 'NUMBER', 'CHECKBOX'
 * @returns {Promise<boolean>} - True if field exists or was created
 */
async function ensureOpportunityCustomField(fieldName, fieldType = 'TEXT') {
  return createCustomField(fieldName, fieldType, 'opportunity')
}

/**
 * Create an opportunity in GoHighLevel (API v2)
 * @param {string} contactId - The contact ID
 * @param {Object} data - Opportunity data
 * @param {Array} fileUrls - Array of file URLs from GHL uploads
 * @param {string} pipelineId - Optional pipeline ID (uses env var if not provided)
 * @param {string} stageId - Optional stage ID (uses env var if not provided)
 * @returns {Promise<Object>} - Created opportunity
 */
export async function createOpportunity(contactId, data, fileUrls = [], pipelineId = null, stageId = null) {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    throw new Error('GoHighLevel API credentials not configured')
  }

  if (!contactId) {
    throw new Error('Contact ID is required to create opportunity')
  }

  // Use provided pipelineId/stageId or fall back to environment variables
  const finalPipelineId = pipelineId || GHL_PIPELINE_ID
  const finalStageId = stageId || GHL_STAGE_ID

  if (!finalPipelineId || !finalStageId) {
    console.warn('⚠️  Pipeline ID or Stage ID not set in environment variables')
    console.warn('   GHL_PIPELINE_ID:', finalPipelineId || 'NOT SET')
    console.warn('   GHL_STAGE_ID:', finalStageId || 'NOT SET')
    console.warn('   Attempting to fetch pipelines automatically...')
    
    // Try to get pipelines and use the first one if not configured
    try {
      const pipelines = await getPipelines()
      if (pipelines && pipelines.length > 0) {
        const firstPipeline = pipelines[0]
        const usePipelineId = finalPipelineId || firstPipeline.id
        
        if (!finalStageId && firstPipeline.stages && firstPipeline.stages.length > 0) {
          const firstStage = firstPipeline.stages[0]
          console.log('✅ Using first pipeline and stage automatically:')
          console.log('   Pipeline ID:', usePipelineId)
          console.log('   Stage ID:', firstStage.id)
          return await createOpportunityWithIds(contactId, data, fileUrls, usePipelineId, firstStage.id)
        } else {
          console.error('❌ No stages found in first pipeline')
        }
      } else {
        console.error('❌ No pipelines found in GHL account')
      }
    } catch (error) {
      console.error('❌ Error fetching pipelines:', error.message)
    }
    
    throw new Error('Pipeline ID and Stage ID are required. Please set GHL_PIPELINE_ID and GHL_STAGE_ID in environment variables, or provide them as parameters.')
  }

  return await createOpportunityWithIds(contactId, data, fileUrls, finalPipelineId, finalStageId)
}

/**
 * Create an opportunity in GoHighLevel with pipeline and stage IDs
 * @param {string} contactId - The contact ID
 * @param {Object} data - Opportunity data
 * @param {Array} fileUrls - Array of file URLs from GHL uploads
 * @param {string} pipelineId - Pipeline ID
 * @param {string} stageId - Stage ID
 * @returns {Promise<Object>} - Created opportunity
 */
async function createOpportunityWithIds(contactId, data, fileUrls, pipelineId, stageId) {
  // Prefix for OPPORTUNITY fields - same as contact fields
  // GHL only allows underscores, no spaces or hyphens
  // Using same "Web_Form_" prefix as contact fields (fields must be created manually in GHL UI)
  const FIELD_PREFIX = 'Web_Form_'
  
  const source = data.source || ''
  const isWebsiteRevision = source === 'Website Revision Form' || source.includes('Website Revision')
  const isGetStarted = source === 'Get Started Form' || source.includes('Get Started')
  const isSEOServices = source === 'SEO Services Form' || source.includes('SEO Services')
  const isGoogleBusinessProfile = source === 'Google Business Profile Form' || source.includes('Google Business Profile')
  const isLeadGeneration = source === 'Lead Generation Form' || source.includes('Lead Generation')
  const isSurvey = source === 'Website Survey Form' || source.includes('Website Survey') || source.includes('Survey')
  
  // Define all survey fields that should be custom fields in GHL for opportunities
  // This automatically creates fields based on your survey structure
  const allFieldDefinitions = [
    // Website Goals (arrays will be joined as comma-separated strings)
    { surveyKey: 'websiteGoals', displayName: `${FIELD_PREFIX}Website_Goals`, type: 'TEXT' },
    
    // Functionality Needs
    { surveyKey: 'functionalityNeeds', displayName: `${FIELD_PREFIX}Functionality_Needs`, type: 'TEXT' },
    { surveyKey: 'otherFeatures', displayName: `${FIELD_PREFIX}Other_Features`, type: 'TEXT' },
    
    // Design & Branding
    { surveyKey: 'hasLogo', displayName: `${FIELD_PREFIX}Has_Logo`, type: 'TEXT' },
    { surveyKey: 'hasBrandColors', displayName: `${FIELD_PREFIX}Has_Brand_Colors`, type: 'TEXT' },
    { surveyKey: 'brandColors', displayName: `${FIELD_PREFIX}Brand_Colors`, type: 'TEXT' },
    { surveyKey: 'designRequests', displayName: `${FIELD_PREFIX}Design_Requests`, type: 'TEXT' },
    { surveyKey: 'preferredFonts', displayName: `${FIELD_PREFIX}Preferred_Fonts`, type: 'TEXT' },
    { surveyKey: 'referenceWebsites', displayName: `${FIELD_PREFIX}Reference_Websites`, type: 'TEXT' },
    
    // Social Media
    { surveyKey: 'linkSocialMedia', displayName: `${FIELD_PREFIX}Link_Social_Media`, type: 'TEXT' },
    { surveyKey: 'facebookLink', displayName: `${FIELD_PREFIX}Facebook_Link`, type: 'TEXT' },
    { surveyKey: 'youtubeLink', displayName: `${FIELD_PREFIX}YouTube_Link`, type: 'TEXT' },
    { surveyKey: 'tiktokLink', displayName: `${FIELD_PREFIX}TikTok_Link`, type: 'TEXT' },
    { surveyKey: 'instagramLink', displayName: `${FIELD_PREFIX}Instagram_Link`, type: 'TEXT' },
    
    // Content & Services
    { surveyKey: 'servicesList', displayName: `${FIELD_PREFIX}Services_List`, type: 'TEXT' },
    { surveyKey: 'businessDescription', displayName: `${FIELD_PREFIX}Business_Description`, type: 'TEXT' },
    { surveyKey: 'specialOffers', displayName: `${FIELD_PREFIX}Special_Offers`, type: 'TEXT' },
    
    // Domain & Hosting
    { surveyKey: 'hasWebsite', displayName: `${FIELD_PREFIX}Has_Website`, type: 'TEXT' },
    { surveyKey: 'domainName', displayName: `${FIELD_PREFIX}Domain_Name`, type: 'TEXT' },
    { surveyKey: 'needDomainHelp', displayName: `${FIELD_PREFIX}Need_Domain_Help`, type: 'TEXT' },
    
    // Business Basics
    { surveyKey: 'businessName', displayName: `${FIELD_PREFIX}Business_Name`, type: 'TEXT' },
    { surveyKey: 'businessAddress', displayName: `${FIELD_PREFIX}Business_Address`, type: 'TEXT' },
    
    // Legal / Copyright
    { surveyKey: 'needContentWriting', displayName: `${FIELD_PREFIX}Need_Content_Writing`, type: 'TEXT' },
    { surveyKey: 'hasLegalRequirements', displayName: `${FIELD_PREFIX}Has_Legal_Requirements`, type: 'TEXT' },
    { surveyKey: 'privacyPolicy', displayName: `${FIELD_PREFIX}Privacy_Policy`, type: 'CHECKBOX' },
    { surveyKey: 'disclaimer', displayName: `${FIELD_PREFIX}Disclaimer`, type: 'CHECKBOX' },
    { surveyKey: 'terms', displayName: `${FIELD_PREFIX}Terms`, type: 'CHECKBOX' },
    { surveyKey: 'agreeToTerms', displayName: `${FIELD_PREFIX}Agree_to_Terms`, type: 'CHECKBOX' },
    // Website Revision fields
    { surveyKey: 'wrPriority', displayName: `${FIELD_PREFIX}WR_Priority`, type: 'TEXT' },
    { surveyKey: 'wrRequestedChanges', displayName: `${FIELD_PREFIX}WR_Requested_Changes`, type: 'TEXT' },
    { surveyKey: 'websiteUrl', displayName: `${FIELD_PREFIX}Website_URL`, type: 'TEXT' },
    { surveyKey: 'message', displayName: `${FIELD_PREFIX}Message`, type: 'TEXT' },
    // WR form specific field mappings (for fields that have WR_ prefix in GHL)
    { surveyKey: 'wrBusinessName', displayName: `${FIELD_PREFIX}WR_Business_Name`, type: 'TEXT' },
    { surveyKey: 'wrWebsiteUrl', displayName: `${FIELD_PREFIX}WR_Website_URL`, type: 'TEXT' },
    
    // Get Started form specific field mappings (for fields that have GS_ prefix in GHL)
    { surveyKey: 'gsMessage', displayName: `${FIELD_PREFIX}GS_Message`, type: 'TEXT' },
    
    // SEO Services specific fields
    { surveyKey: 'seoCurrentRanking', displayName: `${FIELD_PREFIX}SEO_Current_Ranking`, type: 'TEXT' },
    { surveyKey: 'seoTargetKeywords', displayName: `${FIELD_PREFIX}SEO_Target_Keywords`, type: 'TEXT' },
    { surveyKey: 'seoServicesNeeded', displayName: `${FIELD_PREFIX}SEO_Services_Needed`, type: 'TEXT' },
    // SEO form specific field mappings (for fields that have SEO_ prefix in GHL)
    { surveyKey: 'seoBusinessName', displayName: `${FIELD_PREFIX}SEO_Business_Name`, type: 'TEXT' },
    { surveyKey: 'seoWebsiteUrl', displayName: `${FIELD_PREFIX}SEO_Website_URL`, type: 'TEXT' },
    { surveyKey: 'seoBusinessAddress', displayName: `${FIELD_PREFIX}SEO_Business_Address`, type: 'TEXT' },
    { surveyKey: 'seoMessage', displayName: `${FIELD_PREFIX}SEO_Message`, type: 'TEXT' },
    
    // Google Business Profile specific fields
    { surveyKey: 'gbpInterestedPackage', displayName: `${FIELD_PREFIX}GBP_Interested_Package`, type: 'TEXT' },
    { surveyKey: 'gbpSetupPackage', displayName: `${FIELD_PREFIX}GBP_Setup_Package`, type: 'TEXT' },
    { surveyKey: 'gbpMonthlyManagement', displayName: `${FIELD_PREFIX}GBP_Monthly_Management`, type: 'TEXT' },
    { surveyKey: 'gbpSetupDetails', displayName: `${FIELD_PREFIX}GBP_Setup_Details`, type: 'TEXT' },
    { surveyKey: 'gbpMonthlyDetails', displayName: `${FIELD_PREFIX}GBP_Monthly_Details`, type: 'TEXT' },
    // GBP form specific field mappings (for fields that have GBP_ prefix in GHL)
    { surveyKey: 'gbpBusinessName', displayName: `${FIELD_PREFIX}GBP_Business_Name`, type: 'TEXT' },
    { surveyKey: 'gbpBusinessAddress', displayName: `${FIELD_PREFIX}GBP_Business_Address`, type: 'TEXT' },
    { surveyKey: 'gbpMessage', displayName: `${FIELD_PREFIX}GBP_Message`, type: 'TEXT' },
    
    // Lead Generation specific fields
    { surveyKey: 'lgMonthlyBudget', displayName: `${FIELD_PREFIX}LG_Monthly_Budget`, type: 'TEXT' },
    { surveyKey: 'lgTargetAudience', displayName: `${FIELD_PREFIX}LG_Target_Audience`, type: 'TEXT' },
    { surveyKey: 'lgCurrentLeads', displayName: `${FIELD_PREFIX}LG_Current_Leads`, type: 'TEXT' },
    { surveyKey: 'lgLeadGoals', displayName: `${FIELD_PREFIX}LG_Lead_Goals`, type: 'TEXT' },
    { surveyKey: 'lgAdPlatforms', displayName: `${FIELD_PREFIX}LG_Ad_Platforms`, type: 'TEXT' },
    // LG form specific field mappings (for fields that have LG_ prefix in GHL)
    { surveyKey: 'lgBusinessName', displayName: `${FIELD_PREFIX}LG_Business_Name`, type: 'TEXT' },
    { surveyKey: 'lgBusinessAddress', displayName: `${FIELD_PREFIX}LG_Business_Address`, type: 'TEXT' },
    { surveyKey: 'lgWebsiteUrl', displayName: `${FIELD_PREFIX}LG_Website_URL`, type: 'TEXT' },
    { surveyKey: 'lgMessage', displayName: `${FIELD_PREFIX}LG_Message`, type: 'TEXT' },
    
    // GHL File Upload URLs
    { surveyKey: 'ghlFileUrls', displayName: `${FIELD_PREFIX}GHL_File_URLs`, type: 'TEXT' }
  ]

  // Use ALL field definitions for opportunities (no filtering)
  // This ensures all fields populate regardless of form source
  const surveyFieldDefinitions = allFieldDefinitions
  console.log(`📋 Processing ${surveyFieldDefinitions.length} opportunity field definitions`)

  // Note: Custom fields should already exist in GHL
  // Skip field creation to speed up form submissions
  // Run scripts/create-ghl-contact-fields.js if fields need to be created

  // Build comprehensive notes with all information
  let notes = ''
  if (isWebsiteRevision) {
    notes = `Website Revision Request\n\nName: ${data.ownerContact || 'N/A'}\nEmail: ${data.email || 'N/A'}\nPhone: ${data.phone || 'N/A'}\nBusiness Name: ${data.businessName || 'N/A'}\nWebsite URL: ${data.websiteUrl || 'N/A'}\n\nPriority: ${data.wrPriority || 'N/A'}\nRequested Changes:\n${data.wrRequestedChanges || data.message || 'N/A'}`
  } else if (isGetStarted) {
    notes = `Get Started Form Submission - Strategy Call Request\n\nName: ${data.ownerContact || 'N/A'}\nEmail: ${data.email || 'N/A'}\nPhone: ${data.phone || 'N/A'}\n\n${data.message || 'Interested in booking a free strategy call to discuss business goals and growth opportunities.'}`
  } else {
    notes = `Website Assessment Form Submission\n\nBusiness: ${data.businessName || 'N/A'}\nEmail: ${data.email || 'N/A'}\nPhone: ${data.phone || 'N/A'}\nOwner/Contact: ${data.ownerContact || 'N/A'}\nBusiness Address: ${data.businessAddress || 'N/A'}\n\nWebsite Goals: ${data.websiteGoals?.join(', ') || 'N/A'}\nFunctionality Needs: ${data.functionalityNeeds?.join(', ') || 'N/A'}\nHas Website: ${data.hasWebsite || 'N/A'}\nDomain: ${data.domainName || 'N/A'}\nNeed Domain Help: ${data.needDomainHelp || 'N/A'}\n\nHas Logo: ${data.hasLogo || 'N/A'}\nHas Brand Colors: ${data.hasBrandColors || 'N/A'}\nBrand Colors: ${data.brandColors?.filter(c => c).join(', ') || 'N/A'}\nDesign Requests: ${data.designRequests || 'N/A'}\nPreferred Fonts: ${data.preferredFonts || 'N/A'}\nReference Websites: ${data.referenceWebsites || 'N/A'}\n\nLink Social Media: ${data.linkSocialMedia || 'N/A'}\nFacebook: ${data.facebookLink || 'N/A'}\nYouTube: ${data.youtubeLink || 'N/A'}\nTikTok: ${data.tiktokLink || 'N/A'}\nInstagram: ${data.instagramLink || 'N/A'}\n\nServices List: ${data.servicesList || 'N/A'}\nBusiness Description: ${data.businessDescription || 'N/A'}\nSpecial Offers: ${data.specialOffers || 'N/A'}\n\nNeed Content Writing: ${data.needContentWriting || 'N/A'}\nLegal Requirements: ${data.hasLegalRequirements || 'N/A'}\nPrivacy Policy: ${data.privacyPolicy ? 'Yes' : 'No'}\nDisclaimer: ${data.disclaimer ? 'Yes' : 'No'}\nTerms: ${data.terms ? 'Yes' : 'No'}\nAgreed to Terms: ${data.agreeToTerms ? 'Yes' : 'No'}`
  }

  if (fileUrls.length > 0) {
    const logoFiles = fileUrls.filter(f => f.type === 'logo')
    const otherFiles = fileUrls.filter(f => f.type === 'file' || !f.type)
    
    if (logoFiles.length > 0) {
      notes += `\n\nLogo Files:\n${logoFiles.map((f, index) => `${index + 1}. ${f.name || f.url || f}`).join('\n')}`
    }
    
    if (otherFiles.length > 0) {
      notes += `\n\nUploaded Files:\n${otherFiles.map((f, index) => `${index + 1}. ${f.name || f.url || f}`).join('\n')}`
    }
  }

  // Build custom fields array for opportunity
  // GHL opportunity fields use "opportunity.field_name" format
  // Note: ownerContact, email, and phone are standard fields on contacts and accessible
  // through the contactId relationship, so we don't need to store them as custom fields
  const customFields = []
  
  // Map all survey fields to opportunity custom fields
  surveyFieldDefinitions.forEach(fieldDef => {
    // Construct the opportunity key directly from the display name
    // GHL expects just the field key without entity prefix: "web_form_field_name"
    const ghlKey = fieldDef.displayName.toLowerCase().replace(/[^a-z0-9]+/g, '_')
    
    const value = data[fieldDef.surveyKey]
    
    if (value !== undefined && value !== null && value !== '') {
      // Handle arrays (join with comma)
      if (Array.isArray(value)) {
        const filtered = value.filter(v => v)
        if (filtered.length > 0) {
          customFields.push({ key: ghlKey, field_value: filtered.join(', ') })
        }
      }
      // Handle booleans - GHL checkboxes need "Yes" or "No"
      else if (typeof value === 'boolean') {
        customFields.push({ key: ghlKey, field_value: value ? 'Yes' : 'No' })
      }
      // Handle string booleans (from form submissions) - convert to "Yes"/"No" for checkboxes
      else if (fieldDef.type === 'CHECKBOX' || (typeof value === 'string' && (value === 'true' || value === 'false'))) {
        const fieldValue = (value === true || value === 'true' || value === 'True') ? 'Yes' : 'No'
        customFields.push({ key: ghlKey, field_value: fieldValue })
      }
      // Handle strings and other values
      else {
        customFields.push({ key: ghlKey, field_value: String(value) })
      }
    }
  })

  // Add uploaded files field with GHL URLs
  console.log(`📁 Processing file URLs for opportunity: ${fileUrls.length} files received`)
  if (fileUrls.length > 0) {
    console.log(`   File URLs structure:`, JSON.stringify(fileUrls, null, 2))
    
    // Separate logo files from other files
    const logoFiles = fileUrls.filter(f => f.type === 'logo')
    const otherFiles = fileUrls.filter(f => f.type === 'file' || f.type === undefined)
    
    console.log(`   Logo files: ${logoFiles.length}, Other files: ${otherFiles.length}`)
    
    // Add logo URL to Has_Logo field - store just the URL(s), not the filename
    // Check if hasLogo is set in data OR if logo files were uploaded
    const hasLogoInData = data.hasLogo === 'Yes' || data.hasLogo === true || data.hasLogo === 'true'
    
    if (logoFiles.length > 0) {
      // Only include actual URLs (starting with http), not filenames
      const logoUrls = logoFiles
        .map(f => f.url)
        .filter(url => url && url.startsWith('http'))
      
      console.log(`   Logo URLs found: ${logoUrls.length}`, logoUrls)
      
      if (logoUrls.length > 0) {
        const logoUrlsString = logoUrls.join(', ')
        // Store just the URL(s) in Has_Logo field
        customFields.push({
          key: `${FIELD_PREFIX.toLowerCase()}has_logo`,
          field_value: logoUrlsString
        })
        console.log(`   ✅ Logo URLs stored in Has_Logo: ${logoUrlsString}`)
      } else {
        // If no valid URLs, just mark as "Yes" if logo was attempted
        customFields.push({
          key: `${FIELD_PREFIX.toLowerCase()}has_logo`,
          field_value: 'Yes'
        })
        console.log(`   ⚠️  Logo files uploaded but no valid URLs returned`)
        console.log(`   Logo files data:`, JSON.stringify(logoFiles, null, 2))
      }
    } else if (hasLogoInData) {
      // If hasLogo is "Yes" in form data but no file was uploaded, still set it to "Yes"
      customFields.push({
        key: `${FIELD_PREFIX.toLowerCase()}has_logo`,
        field_value: 'Yes'
      })
      console.log(`   ✅ Has_Logo set to "Yes" based on form data (no file uploaded)`)
    }
    
    // Add all file URLs (logo + other files) to the Uploaded_Files field
    // Only include actual URLs (starting with http), not filenames
    const allFileUrls = fileUrls
      .map(f => {
        console.log(`   Processing file:`, JSON.stringify(f, null, 2))
        return f.url
      })
      .filter(url => {
        const isValid = url && url.startsWith('http')
        if (!isValid && url) {
          console.log(`   ⚠️  Invalid URL format (not starting with http): ${url}`)
        }
        return isValid
      })
    
    console.log(`   All valid file URLs: ${allFileUrls.length}`, allFileUrls)
    
    if (allFileUrls.length > 0) {
      const allFileUrlsString = allFileUrls.join(', ')
      
      // Determine form-specific file upload field based on source
      let uploadedFilesKey
      if (isWebsiteRevision) {
        uploadedFilesKey = `${FIELD_PREFIX.toLowerCase()}wr_uploaded_files`
        console.log(`   📋 Using Website Revision specific field: ${uploadedFilesKey}`)
      } else if (isSEOServices) {
        uploadedFilesKey = `${FIELD_PREFIX.toLowerCase()}seo_uploaded_files`
        console.log(`   📋 Using SEO Services specific field: ${uploadedFilesKey}`)
      } else if (isGoogleBusinessProfile) {
        uploadedFilesKey = `${FIELD_PREFIX.toLowerCase()}gbp_uploaded_files`
        console.log(`   📋 Using Google Business Profile specific field: ${uploadedFilesKey}`)
      } else if (isLeadGeneration) {
        uploadedFilesKey = `${FIELD_PREFIX.toLowerCase()}lg_uploaded_files`
        console.log(`   📋 Using Lead Generation specific field: ${uploadedFilesKey}`)
      } else if (isGetStarted) {
        uploadedFilesKey = `${FIELD_PREFIX.toLowerCase()}gs_uploaded_files`
        console.log(`   📋 Using Get Started specific field: ${uploadedFilesKey}`)
      } else {
        // Default to generic Uploaded_Files for Survey form
        uploadedFilesKey = `${FIELD_PREFIX.toLowerCase()}uploaded_files`
        console.log(`   📋 Using default Uploaded_Files field: ${uploadedFilesKey}`)
      }
      
      customFields.push({
        key: uploadedFilesKey,
        field_value: allFileUrlsString
      })
      console.log(`   ✅ All file URLs stored in form-specific Uploaded_Files field`)
      console.log(`   Field key: ${uploadedFilesKey}`)
      console.log(`   Field value: ${allFileUrlsString}`)
    } else {
      console.log(`   ⚠️  Files uploaded but no valid URLs returned`)
      console.log(`   Raw fileUrls array:`, JSON.stringify(fileUrls, null, 2))
    }
  } else {
    console.log(`   ⚠️  No file URLs provided to opportunity creation`)
  }
  
  // Handle otherFeaturesText if it exists separately
  if (data.otherFeaturesText) {
    const otherFeaturesKey = `${FIELD_PREFIX.toLowerCase()}other_features`
    // Check if we already added it, if not add it
    if (!customFields.find(f => f.key === otherFeaturesKey)) {
      customFields.push({ key: otherFeaturesKey, field_value: data.otherFeaturesText })
    }
  }

  // GHL API expects customFields as an array of objects: [{ key: "...", field_value: "..." }]
  // Filter out empty values
  const validCustomFields = customFields.filter(field => 
    field.key && 
    field.field_value !== undefined && 
    field.field_value !== null && 
    field.field_value !== ''
  )

  const opportunityName = isWebsiteRevision 
    ? `Website Revision - ${data.businessName || 'New Request'}`
    : isGetStarted
    ? `Strategy Call - ${data.ownerContact || data.businessName || 'New Lead'}`
    : `Website Project - ${data.businessName || 'New Lead'}`
  
  const opportunitySource = isWebsiteRevision
    ? 'Website Revision Form'
    : isGetStarted
    ? 'Get Started Form'
    : (data.source || 'Website Survey Form')

  const opportunityData = {
    name: opportunityName,
    contactId: contactId,
    pipelineId: pipelineId, // Pipeline ID in request body
    pipelineStageId: stageId, // Stage ID in request body (note: pipelineStageId, not stageId)
    status: 'open', // Status: 'open', 'won', 'lost', 'abandoned'
    monetaryValue: 0,
    assignedTo: null,
    source: opportunitySource,
    // Note: 'notes' field is not supported in opportunity creation - use customFields instead
    // GHL API expects customFields as array format: [{ key: "...", field_value: "..." }]
    customFields: validCustomFields.length > 0 ? validCustomFields : undefined,
    locationId: GHL_LOCATION_ID // locationId in request body per GHL API v2.0
  }
  
  // Remove undefined customFields to avoid sending empty array
  if (!opportunityData.customFields || opportunityData.customFields.length === 0) {
    delete opportunityData.customFields
  }
  
  // Add notes as a custom field if needed, or store in opportunity description/name
  // For now, we'll include key info in the name and use customFields for details

  // Note: GHL API may not support attachments field directly in opportunity creation
  // File URLs are already included in customFields if needed

  try {
    // Use API v2 endpoint: /v1/opportunities/ (not /pipelines/{id}/opportunities/)
    // Per GHL API: pipelineId and pipelineStageId go in request body
    const url = `${GHL_API_URL}/opportunities/`
    
    console.log('📤 Creating opportunity in GHL:')
    console.log('   URL:', url)
    console.log('   Pipeline ID:', pipelineId)
    console.log('   Pipeline Stage ID:', stageId)
    console.log('   Contact ID:', contactId)
    console.log('   Location ID:', GHL_LOCATION_ID)
    console.log('   Custom Fields Count:', customFields.length)
    console.log('   Valid Custom Fields:', JSON.stringify(validCustomFields, null, 2))
    console.log('   Full Opportunity Payload:', JSON.stringify(opportunityData, null, 2))
    
    // Wait for rate limit slot
    await ghlRateLimiter.waitForSlot()

    const response = await retryWithBackoff(async () => {
      return await fetchWithTimeout(
        url,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Content-Type': 'application/json',
            'Version': '2021-07-28'
          },
          body: JSON.stringify(opportunityData)
        },
        GHL_REQUEST_TIMEOUT
      )
    })

    await handleGHLResponse(response, {
      operation: 'createOpportunity',
      pipelineId,
      stageId,
      contactId,
      locationId: GHL_LOCATION_ID
    })

    const result = await response.json()
    
    console.log('✅ Opportunity created successfully!')
    console.log('   Response Status:', response.status)
    console.log('   Parsed Result:', JSON.stringify(result, null, 2))
    
    // GHL API might return opportunity directly or nested
    const opportunity = result.opportunity || result.opportunities?.[0] || result
    console.log('   Opportunity ID:', opportunity?.id || 'N/A')
    
    if (!opportunity || !opportunity.id) {
      console.warn('⚠️  Warning: Opportunity created but no ID found in response')
      console.warn('   Full response:', JSON.stringify(result, null, 2))
    }
    
    return opportunity || result
  } catch (error) {
    console.error('❌ Error creating opportunity in GHL:', error)
    throw error
  }
}

/**
 * Update custom fields for a contact
 * @param {string} contactId - The contact ID
 * @param {Array} fields - Array of custom field objects with key and field_value
 * @returns {Promise<Object>} - Updated contact
 */
export async function updateCustomFields(contactId, fields) {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    throw new Error('GoHighLevel API credentials not configured')
  }

  if (!contactId) {
    throw new Error('Contact ID is required')
  }

  try {
    const response = await fetch(
      `${GHL_API_URL}/contacts/${contactId}?locationId=${GHL_LOCATION_ID}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28'
        },
        body: JSON.stringify({
          customFields: fields
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`GHL API error: ${response.status} - ${errorData}`)
    }

    const result = await response.json()
    return result.contact || result
  } catch (error) {
    console.error('Error updating custom fields in GHL:', error)
    throw error
  }
}

