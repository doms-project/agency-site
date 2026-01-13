import { NextResponse } from 'next/server'
import { createContact, createOpportunity, uploadFileToGHL } from '@/lib/ghlIntegration'
import { formatPhoneNumber } from '@/lib/utils/phoneFormatter'
import { generateReviewToken } from '@/lib/reviewTokens'

export async function POST(request) {
  try {
    const formData = await request.formData()
    
    // Extract form data
    const data = {}
    const files = []

    // Process form fields
    for (const [key, value] of formData.entries()) {
      // Check if it's a file (File or Blob with size > 0)
      const isFile = (value instanceof File) || (value instanceof Blob && value.size > 0 && value.type)
      
      if (isFile && value.size > 0) {
        console.log(`📁 File detected: ${key}, name: ${value.name || 'unnamed'}, size: ${value.size}, type: ${value.type}`)
        // Handle file uploads (all files go to the same array for Website Revision)
        files.push(value)
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
    if (!data.name || !data.phone || !data.email || !data.priority) {
      return NextResponse.json(
        { error: 'Name, Phone, Email, and Priority are required fields' },
        { status: 400 }
      )
    }

    // Format phone number to E.164 format
    const formattedPhone = formatPhoneNumber(data.phone)

    // Handle file uploads - upload directly to GHL (Vercel has read-only filesystem)
    const fileUrls = []
    
    console.log(`📁 Files to upload: ${files.length} file(s)`)
    
    // Upload files to GHL
    if (files.length > 0) {
      console.log(`📤 Uploading ${files.length} file(s) to GHL...`)
      for (const file of files) {
        if (file && file.size > 0) {
          try {
            // Convert file to buffer
            const arrayBuffer = await file.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            
            console.log(`📤 Uploading file: ${file.name || 'file'}, size: ${file.size}, type: ${file.type || 'unknown'}`)
            const fileUrl = await uploadFileToGHL(buffer, file.name || 'file.png', file.type || 'application/octet-stream')
            console.log(`📁 File upload result: ${fileUrl}`)
            
            if (fileUrl && fileUrl.startsWith('http')) {
              fileUrls.push({ url: fileUrl, name: file.name || 'file', type: 'file' })
              console.log(`   ✅ File successfully uploaded to GHL: ${fileUrl}`)
            } else {
              console.warn(`   ⚠️  File upload returned invalid URL: ${fileUrl}`)
            }
          } catch (error) {
            console.error(`❌ Error uploading file ${file.name}:`, error.message)
            console.error(`   Stack:`, error.stack)
            // Continue even if file upload fails - don't block form submission
          }
        }
      }
    }
    
    console.log(`📁 Total files uploaded: ${fileUrls.length}`)
    if (fileUrls.length > 0) {
      console.log('   ✅ File URLs successfully uploaded:', JSON.stringify(fileUrls, null, 2))
    } else {
      console.log('   ⚠️  No files were successfully uploaded to GHL')
      if (files.length > 0) {
        console.log(`   ⚠️  Files were provided (${files.length} files) but uploads may have failed`)
      }
    }

    // Prepare contact data with Website Revision tag
    const contactData = {
      ownerContact: data.name.trim(),
      email: data.email.trim(),
      phone: formattedPhone,
      businessName: data.businessName || '',
      businessAddress: '',
      source: 'Website Revision Form',
      tags: ['Website Revision Form', 'New Lead']
    }

    // Create contact in GoHighLevel
    let contact
    try {
      console.log('📞 Attempting to create Website Revision contact in GHL...')
      console.log('   Name:', contactData.ownerContact)
      console.log('   Email:', contactData.email)
      console.log('   Phone:', contactData.phone)
      
      contact = await createContact(contactData)
      
      console.log('✅ Contact created successfully!')
      console.log('   Contact ID:', contact?.id)
    } catch (error) {
      console.error('❌ Error creating contact in GHL:')
      console.error('   Error:', error.message)
      console.error('   Stack:', error.stack)
      if (error.response) {
        console.error('   Response:', error.response)
      }
      return NextResponse.json(
        { error: `Failed to create contact: ${error.message}` },
        { status: 500 }
      )
    }

    // Prepare opportunity data with website revision details
    // Note: Using WR-specific field names to map to GHL fields with WR_ prefix
    const opportunityData = {
      businessName: data.businessName || 'Website Revision Request', // Keep for opportunity name
      ownerContact: contactData.ownerContact,
      email: data.email,
      phone: formattedPhone, // Use formatted phone number
      businessAddress: '',
      // WR-specific field mappings for GHL custom fields
      wrBusinessName: data.businessName || '',
      wrWebsiteUrl: data.websiteUrl || '',
      message: data.requestedChanges || '',
      // Website Revision specific fields
      wrPriority: data.priority || '',
      wrRequestedChanges: data.requestedChanges || '',
      source: 'Website Revision Form'
    }

    // Create opportunity in GoHighLevel if contact was created
    if (contact && contact.id) {
      try {
        console.log('🎯 Attempting to create Website Revision opportunity in GHL...')
        console.log('   Contact ID:', contact.id)
        console.log('   Pipeline ID:', process.env.GHL_PIPELINE_ID || 'NOT SET')
        console.log('   Stage ID:', process.env.GHL_STAGE_ID_WEBSITE_REVISION || process.env.GHL_STAGE_ID_OTHER_FORMS || process.env.GHL_STAGE_ID || 'NOT SET')
        console.log('   Source:', opportunityData.source)
        console.log('   📁 File URLs being passed to opportunity:', fileUrls.length, 'files')
        if (fileUrls.length > 0) {
          console.log('   File URLs details:', JSON.stringify(fileUrls, null, 2))
        } else {
          console.log('   ⚠️  WARNING: No file URLs to pass to opportunity!')
        }
        // Use different stage ID for Website Revision form (if set in env)
        const stageId = process.env.GHL_STAGE_ID_WEBSITE_REVISION || process.env.GHL_STAGE_ID_OTHER_FORMS || null
        const opportunity = await createOpportunity(contact.id, opportunityData, fileUrls, null, stageId)
        console.log('✅ Opportunity created successfully!')
        console.log('   Opportunity ID:', opportunity?.id || 'N/A')

        // Store opportunity ID for token generation
        const opportunityId = opportunity?.id
      } catch (error) {
        console.error('❌ Error creating opportunity in GHL:')
        console.error('   Error Message:', error.message)
        console.error('   Error Stack:', error.stack)
        // Continue even if opportunity creation fails
      }
    }

    // Generate review token for future feedback collection
    let reviewToken = null;
    try {
      if (contact && opportunityId) {
        reviewToken = await generateReviewToken({
          name: data.ownerContact || 'Website Revision Client',
          email: data.email,
          phone: data.phone,
          projectId: opportunityId,
          projectType: 'website-revision'
        });
        console.log('✅ Review token generated for website revision:', reviewToken.token);
      }
    } catch (tokenError) {
      console.error('⚠️ Failed to generate review token:', tokenError);
      // Don't fail the main request for this
    }

    return NextResponse.json({
      success: true,
      message: 'Website revision request submitted successfully',
      contactId: contact?.id || null,
      reviewToken: reviewToken?.token || null,
      ghlFileUrls: fileUrls.map(f => f.url || f.name).filter(Boolean)
    })
  } catch (error) {
    console.error('Website Revision submission error:', error)
    
    return NextResponse.json(
      { error: error.message || 'An error occurred while processing your submission. Please try again.' },
      { status: 500 }
    )
  }
}

