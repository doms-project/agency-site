import { NextResponse } from 'next/server'
import { createContact, createOpportunity } from '@/lib/ghlIntegration'
import { formatPhoneNumber } from '@/lib/utils/phoneFormatter'

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Extract form data
    const {
      firstName,
      lastName,
      email,
      phone,
      businessName,
      businessAddress,
      interestedPackage, // 'setup', 'monthly', or 'both'
      message
    } = body

    // Validate required fields
    if (!firstName || !phone || !email) {
      return NextResponse.json(
        { error: 'First Name, Phone, and Email are required fields' },
        { status: 400 }
      )
    }

    // Format phone number to E.164 format
    const formattedPhone = formatPhoneNumber(phone)

    // Prepare contact data with Google Business Profile tag
    const contactData = {
      ownerContact: `${firstName} ${lastName || ''}`.trim(),
      email: email.trim(),
      phone: formattedPhone,
      businessName: businessName || '',
      businessAddress: businessAddress || '',
      source: 'Google Business Profile Form',
      tags: ['Google Business Profile Form', 'New Lead']
    }

    // Create contact in GoHighLevel
    let contact
    try {
      console.log('📞 Attempting to create Google Business Profile contact in GHL...')
      console.log('   Name:', contactData.ownerContact)
      console.log('   Email:', contactData.email)
      console.log('   Phone:', contactData.phone)
      console.log('   Contact Data:', JSON.stringify(contactData, null, 2))
      
      contact = await createContact(contactData)
      
      console.log('✅ Contact created successfully!')
      console.log('   Contact ID:', contact?.id)
    } catch (error) {
      console.error('❌ Error creating contact in GHL:')
      console.error('   Error Message:', error.message)
      console.error('   Error Stack:', error.stack)
      console.error('   Contact Data Sent:', JSON.stringify(contactData, null, 2))
      
      // Return more detailed error in development
      const isDevelopment = process.env.NODE_ENV === 'development'
      const errorMessage = isDevelopment 
        ? `Failed to create contact: ${error.message}`
        : 'Failed to create contact. Please try again.'
      
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      )
    }

    // Prepare opportunity data with package details
    // Note: Using GBP-specific field names to map to GHL fields with GBP_ prefix
    const opportunityData = {
      businessName: businessName || 'New Business', // Keep for opportunity name
      ownerContact: contactData.ownerContact,
      email: email,
      phone: phone,
      // GBP-specific field mappings for GHL custom fields
      gbpBusinessName: businessName || '',
      gbpBusinessAddress: businessAddress || '',
      gbpMessage: message || '',
      // Google Business Profile specific fields (will be converted to snake_case by generateFieldKey)
      gbpInterestedPackage: interestedPackage || 'both',
      gbpSetupPackage: interestedPackage === 'setup' || interestedPackage === 'both' ? 'Yes' : 'No',
      gbpMonthlyManagement: interestedPackage === 'monthly' || interestedPackage === 'both' ? 'Yes' : 'No',
      // Package details - formatted as requested
      gbpSetupDetails: interestedPackage === 'setup' || interestedPackage === 'both' 
        ? '✔ Full Google Business Profile setup\n✔ Optimize name, description, and categories\n✔ Add keywords for better ranking\n✔ Upload high-quality photos and business info\n✔ Verify your business on Google'
        : '',
      gbpMonthlyDetails: interestedPackage === 'monthly' || interestedPackage === 'both'
        ? '✔ Post weekly updates and offers\n✔ Respond to reviews professionally\n✔ Monitor analytics and ranking performance\n✔ Keep your profile active and competitive'
        : '',
      source: 'Google Business Profile Form'
    }

    // Create opportunity in GoHighLevel if contact was created
    if (contact && contact.id) {
      try {
        console.log('🎯 Attempting to create Google Business Profile opportunity in GHL...')
        console.log('   Contact ID:', contact.id)
        // Use different stage ID for Google Business Profile form (if set in env)
        const stageId = process.env.GHL_STAGE_ID_GOOGLE_BUSINESS_PROFILE || process.env.GHL_STAGE_ID_OTHER_FORMS || null
        const opportunity = await createOpportunity(contact.id, opportunityData, [], null, stageId)
        console.log('✅ Opportunity created successfully!')
        console.log('   Opportunity ID:', opportunity?.id || 'N/A')
      } catch (error) {
        console.error('❌ Error creating opportunity in GHL:')
        console.error('   Error Message:', error.message)
        // Continue even if opportunity creation fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Google Business Profile form submitted successfully',
      contactId: contact?.id || null
    })
  } catch (error) {
    console.error('Google Business Profile submission error:', error)
    
    return NextResponse.json(
      { error: error.message || 'An error occurred while processing your submission. Please try again.' },
      { status: 500 }
    )
  }
}

