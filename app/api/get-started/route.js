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
      message,
      agreeToTerms
    } = body

    // Validate required fields
    if (!firstName || !phone || !email) {
      return NextResponse.json(
        { error: 'First Name, Phone, and Email are required fields' },
        { status: 400 }
      )
    }

    if (!agreeToTerms) {
      return NextResponse.json(
        { error: 'You must agree to the terms and conditions' },
        { status: 400 }
      )
    }

    // Format phone number to E.164 format
    const formattedPhone = formatPhoneNumber(phone)

    // Prepare contact data with Strategy Call tag
    const contactData = {
      ownerContact: `${firstName} ${lastName || ''}`.trim(),
      email: email.trim(),
      phone: formattedPhone,
      businessName: '',
      businessAddress: '',
      source: 'Get Started Form',
      tags: ['Get Started Form', 'Strategy Call', 'New Lead']
    }

    // Create contact in GoHighLevel
    let contact
    try {
      console.log('📞 Attempting to create Get Started contact in GHL...')
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

    // Prepare opportunity data
    // Note: Using GS-specific field names to map to GHL fields with GS_ prefix
    const opportunityData = {
      businessName: 'Strategy Call Request',
      ownerContact: contactData.ownerContact,
      email: email,
      phone: phone,
      businessAddress: '',
      websiteUrl: '',
      message: message || `Get Started Form Submission - Agreed to Terms: ${agreeToTerms ? 'Yes' : 'No'}`,
      // GS-specific field mapping for GHL custom field
      gsMessage: message || `Get Started Form Submission - Agreed to Terms: ${agreeToTerms ? 'Yes' : 'No'}`,
      source: 'Get Started Form'
    }

    // Create opportunity in GoHighLevel if contact was created
    if (contact && contact.id) {
      try {
        console.log('🎯 Attempting to create Get Started opportunity in GHL...')
        console.log('   Contact ID:', contact.id)
        // Use different stage ID for Get Started form (if set in env)
        const stageId = process.env.GHL_STAGE_ID_GET_STARTED || process.env.GHL_STAGE_ID_OTHER_FORMS || null
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
      message: 'Get Started form submitted successfully',
      contactId: contact?.id || null
    })
  } catch (error) {
    console.error('Get Started submission error:', error)
    
    return NextResponse.json(
      { error: error.message || 'An error occurred while processing your submission. Please try again.' },
      { status: 500 }
    )
  }
}

