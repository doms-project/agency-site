import { NextResponse } from 'next/server'
import { createContact, createOpportunity, uploadFileToGHL } from '@/lib/ghlIntegration'
import { formatPhoneNumber } from '@/lib/utils/phoneFormatter'

export async function POST(request) {
  try {
    const formData = await request.formData()
    
    // Extract form data
    const data = {}
    const files = []
    let logoFile = null

    // Process form fields
    for (const [key, value] of formData.entries()) {
      // Check if it's a file (File or Blob with size > 0)
      const isFile = (value instanceof File) || (value instanceof Blob && value.size > 0 && value.type)
      
      if (isFile && value.size > 0) {
        console.log(`📁 File detected: ${key}, name: ${value.name || 'unnamed'}, size: ${value.size}, type: ${value.type}`)
        // Handle logo file separately
        if (key === 'logo') {
          logoFile = value
        } else if (key === 'files' || key.startsWith('file')) {
          // Handle other file uploads
          files.push(value)
        }
      } else {
        // Try to parse JSON arrays
        try {
          const parsed = JSON.parse(value)
          if (Array.isArray(parsed)) {
            data[key] = parsed
          } else {
            data[key] = value
          }
        } catch {
          // Handle string booleans from form submissions
          if (value === 'true' || value === 'True') {
            data[key] = true
          } else if (value === 'false' || value === 'False') {
            data[key] = false
          } else {
            data[key] = value
          }
        }
      }
    }

    // Validate required fields
    if (!data.ownerContact || !data.phone || !data.email) {
      return NextResponse.json(
        { error: 'Owner Name, Phone, and Email are required fields' },
        { status: 400 }
      )
    }

    // Set source for Website Survey Form
    data.source = 'Website Survey Form'
    
    // Format phone number to E.164 format
    const formattedPhone = formatPhoneNumber(data.phone)
    data.phone = formattedPhone

    // Handle file uploads - upload directly to GHL (Vercel has read-only filesystem)
    const ghlFileUrls = []
    
    console.log(`📁 Files to upload: logo=${logoFile ? 'yes' : 'no'}, other files=${files.length}`)
    
    // Upload logo file first if present
    if (logoFile && logoFile.size > 0) {
      try {
        console.log(`📤 Uploading logo: ${logoFile.name || 'logo'}, size: ${logoFile.size}, type: ${logoFile.type}`)
        const bytes = await logoFile.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const ghlFileUrl = await uploadFileToGHL(buffer, logoFile.name || 'logo.png', logoFile.type || 'image/png')
        console.log(`📁 Logo upload result: ${ghlFileUrl}`)
        if (ghlFileUrl && ghlFileUrl.startsWith('http')) {
          ghlFileUrls.push({ type: 'logo', url: ghlFileUrl, name: logoFile.name || 'logo.png' })
          console.log(`   ✅ Logo successfully uploaded to GHL: ${ghlFileUrl}`)
        } else {
          console.warn(`   ⚠️  Logo upload returned invalid URL: ${ghlFileUrl}`)
        }
      } catch (error) {
        console.error(`❌ Error uploading logo file:`, error.message)
        console.error(`   Stack:`, error.stack)
        // Continue even if logo upload fails - don't block form submission
      }
    }
    
    // Upload other files
    if (files.length > 0) {
      console.log(`📤 Uploading ${files.length} additional files...`)
      for (const file of files) {
        if (file && file.size > 0) {
          const bytes = await file.arrayBuffer()
          const buffer = Buffer.from(bytes)
          
          // Upload to GoHighLevel
          try {
            console.log(`📤 Uploading file: ${file.name || 'file'}, size: ${file.size}, type: ${file.type || 'unknown'}`)
            const ghlFileUrl = await uploadFileToGHL(buffer, file.name || 'file.png', file.type || 'application/octet-stream')
            console.log(`📁 File upload result: ${ghlFileUrl}`)
            if (ghlFileUrl && ghlFileUrl.startsWith('http')) {
              ghlFileUrls.push({ type: 'file', url: ghlFileUrl, name: file.name || 'file' })
              console.log(`   ✅ File successfully uploaded to GHL: ${ghlFileUrl}`)
            } else {
              console.warn(`   ⚠️  File upload returned invalid URL: ${ghlFileUrl}`)
            }
          } catch (error) {
            console.error(`❌ Error uploading file ${file.name}:`, error.message)
            console.error(`   Stack:`, error.stack)
            // Continue even if file upload fails - don't block form submission
          }
        }
      }
    }
    
    console.log(`📁 Total files uploaded: ${ghlFileUrls.length}`)
    if (ghlFileUrls.length > 0) {
      console.log('   ✅ File URLs successfully uploaded:', JSON.stringify(ghlFileUrls, null, 2))
    } else {
      console.log('   ⚠️  No files were successfully uploaded to GHL')
      if (logoFile || files.length > 0) {
        console.log(`   ⚠️  Files were provided (logo: ${logoFile ? 'yes' : 'no'}, other files: ${files.length}) but uploads may have failed`)
      }
    }

    // Prepare contact data with source and tags
    const contactData = {
      ...data,
      source: 'Website Survey Form',
      tags: ['Website Design Form', 'New Lead']
    }

    // Create contact in GoHighLevel
    let contact
    try {
      console.log('📞 Attempting to create contact in GHL...')
      console.log('   Owner Contact:', contactData.ownerContact)
      console.log('   Email:', contactData.email)
      console.log('   Phone:', contactData.phone)
      console.log('   Business Name:', contactData.businessName)
      console.log('   Source:', contactData.source)
      console.log('   Tags:', contactData.tags)
      console.log('   Data keys:', Object.keys(contactData))
      console.log('   Full contact data being sent:', JSON.stringify(contactData, null, 2))
      contact = await createContact(contactData)
      console.log('✅ Contact created successfully!')
      console.log('   Contact object:', JSON.stringify(contact, null, 2))
      console.log('   Contact ID:', contact?.id || contact?.contactId || 'NOT FOUND')
    } catch (error) {
      console.error('❌ Error creating contact in GHL:')
      console.error('   Error:', error.message)
      console.error('   Stack:', error.stack)
      if (error.response) {
        console.error('   Response:', error.response)
      }
      if (error.status === 403) {
        console.error('   ⚠️  403 Error - API key and Location ID must match!')
      }
      // Continue even if GHL fails - we still want to acknowledge the submission
      // In production, you might want to queue this for retry
    }

    // Prepare opportunity data with source
    const opportunityData = {
      ...data,
      source: 'Website Survey Form'
    }

    // Create opportunity in GoHighLevel if contact was created
    const contactId = contact?.id || contact?.contactId || (typeof contact === 'string' ? contact : null)
    console.log('🎯 Checking if opportunity should be created...')
    console.log('   Contact object:', JSON.stringify(contact, null, 2))
    console.log('   Extracted Contact ID:', contactId)
    
    if (contactId) {
      try {
        console.log('🎯 Attempting to create opportunity in GHL...')
        console.log('   Contact ID:', contactId)
        console.log('   Pipeline ID:', process.env.GHL_PIPELINE_ID || 'NOT SET')
        console.log('   Stage ID:', process.env.GHL_STAGE_ID || 'NOT SET')
        console.log('   Source:', opportunityData.source)
        console.log('   Data keys in opportunity data:', Object.keys(opportunityData))
        console.log('   Sample fields:', {
          websiteGoals: opportunityData.websiteGoals,
          functionalityNeeds: opportunityData.functionalityNeeds,
          hasLogo: opportunityData.hasLogo,
          businessName: opportunityData.businessName
        })
        console.log('   📁 File URLs being passed to opportunity:', ghlFileUrls.length, 'files')
        if (ghlFileUrls.length > 0) {
          console.log('   File URLs details:', JSON.stringify(ghlFileUrls, null, 2))
        } else {
          console.log('   ⚠️  WARNING: No file URLs to pass to opportunity!')
        }
        const opportunity = await createOpportunity(contactId, opportunityData, ghlFileUrls)
        console.log('✅ Opportunity created successfully!')
        console.log('   Opportunity object:', JSON.stringify(opportunity, null, 2))
        console.log('   Opportunity ID:', opportunity?.id || 'N/A')
      } catch (error) {
        console.error('❌ Error creating opportunity in GHL:')
        console.error('   Error Message:', error.message)
        console.error('   Error Stack:', error.stack)
        if (error.response) {
          console.error('   Response:', error.response)
        }
        if (error.status) {
          console.error('   Status:', error.status)
        }
        // Continue even if opportunity creation fails
      }
    } else {
      console.error('❌ Skipping opportunity creation - no contact ID available')
      console.error('   Contact object:', JSON.stringify(contact, null, 2))
      console.error('   Contact type:', typeof contact)
      console.error('   Contact keys:', contact ? Object.keys(contact) : 'contact is null/undefined')
    }

    return NextResponse.json({
      success: true,
      message: 'Survey submitted successfully',
      contactId: contact?.id || null,
      ghlFileUrls: ghlFileUrls.map(f => f.url || f.name).filter(Boolean)
    })
  } catch (error) {
    console.error('Survey submission error:', error)
    
    // Provide more detailed error messages in development
    const isDevelopment = process.env.NODE_ENV === 'development'
    const errorMessage = isDevelopment 
      ? `Error: ${error.message || 'An error occurred while processing your submission.'}`
      : 'An error occurred while processing your submission. Please try again.'
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

