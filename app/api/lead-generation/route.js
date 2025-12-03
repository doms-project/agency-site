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
      websiteUrl,
      adPlatforms,
      monthlyBudget,
      targetAudience,
      currentLeads,
      leadGoals,
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

    // Prepare contact data with Lead Generation tag
    const contactData = {
      ownerContact: `${firstName} ${lastName || ''}`.trim(),
      email: email.trim(),
      phone: formattedPhone,
      businessName: businessName || '',
      businessAddress: businessAddress || '',
      source: 'Lead Generation Form',
      tags: ['Lead Generation Form', 'New Lead']
    }

    // Create contact in GoHighLevel
    let contact
    try {
      console.log('📞 Attempting to create Lead Generation contact in GHL...')
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

    // Prepare opportunity data with lead generation details
    // Note: Using LG-specific field names to map to GHL fields with LG_ prefix
    const opportunityData = {
      businessName: businessName || 'New Business', // Keep for opportunity name
      ownerContact: contactData.ownerContact,
      email: email,
      phone: formattedPhone,
      // LG-specific field mappings for GHL custom fields
      lgBusinessName: businessName || '',
      lgBusinessAddress: businessAddress || '',
      lgWebsiteUrl: websiteUrl || '',
      lgMessage: message || '',
      // Lead Generation specific fields
      lgMonthlyBudget: monthlyBudget || '',
      lgTargetAudience: targetAudience || '',
      lgCurrentLeads: currentLeads || '',
      lgLeadGoals: leadGoals || '',
      lgAdPlatforms: Array.isArray(adPlatforms) ? adPlatforms.join(', ') : (adPlatforms || ''),
      source: 'Lead Generation Form'
    }

    // Create opportunity in GoHighLevel if contact was created
    if (contact && contact.id) {
      try {
        console.log('🎯 Attempting to create Lead Generation opportunity in GHL...')
        console.log('   Contact ID:', contact.id)
        // Use different stage ID for Lead Generation form (if set in env)
        const stageId = process.env.GHL_STAGE_ID_LEAD_GENERATION || process.env.GHL_STAGE_ID_OTHER_FORMS || null
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
      message: 'Lead Generation form submitted successfully',
      contactId: contact?.id || null
    })
  } catch (error) {
    console.error('Lead Generation submission error:', error)
    
    return NextResponse.json(
      { error: error.message || 'An error occurred while processing your submission. Please try again.' },
      { status: 500 }
    )
  }
}

