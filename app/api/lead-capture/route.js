import { NextResponse } from 'next/server'
import { createContact, createOpportunity } from '@/lib/ghlIntegration'
import { formatPhoneNumber } from '@/lib/utils/phoneFormatter'

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Extract form fields
    const {
      fullName,
      email,
      phone,
      businessName,
      domainName,
      websiteGoals,
      marketingBudget,
      message
    } = body

    // Validate required fields
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, Email, and Phone are required.' },
        { status: 400 }
      )
    }

    // Format phone number to E.164 format
    const formattedPhone = formatPhoneNumber(phone)

    // Prepare contact data
    const contactData = {
      ownerContact: fullName.trim(),
      email: email.trim(),
      phone: formattedPhone,
      businessName: businessName ? businessName.trim() : '',
      // Pricing lead capture form specific GHL fields
      // Keys map to: web_pricing_form_website_goals, web_pricing_form_domain_name
      pricingWebsiteGoals: websiteGoals || '',
      pricingDomainName: domainName ? domainName.trim() : '',
      // Budget maps to: web_form_marketing_budget
      marketingBudget: marketingBudget || '',
      source: 'Lead Capture Form (Pricing replacement)',
      tags: ['Pricing Lead Capture']
    }


    console.log('📞 Lead Capture - Creating contact in GHL:', contactData)

    // Create contact in GoHighLevel
    let contact
    try {
      contact = await createContact(contactData)
      console.log('✅ Lead Capture - Contact created successfully! ID:', contact?.id)
    } catch (contactError) {
      console.error('❌ Lead Capture - Error creating contact in GHL:', contactError.message)
      return NextResponse.json(
        { error: `Failed to register contact in CRM: ${contactError.message}` },
        { status: 500 }
      )
    }

    // Create opportunity in GoHighLevel if contact was created
    const contactId = contact?.id || contact?.contactId
    if (contactId) {
      try {
        const opportunityData = {
          businessName: businessName ? businessName.trim() : fullName.trim(),
          ownerContact: fullName.trim(),
          email: email.trim(),
          phone: formattedPhone,
          websiteUrl: domainName || '',
          websiteGoals: websiteGoals || '',
          marketingBudget: marketingBudget || '',
          message: message || '',
          source: 'Lead Capture Form (Pricing replacement)'
        }
        
        console.log('🎯 Lead Capture - Creating opportunity in GHL for contact:', contactId)
        const pipelineId = process.env.GHL_LEAD_CAPTURE_PIPELINE_ID || null
        const stageId = process.env.GHL_LEAD_CAPTURE_STAGE_ID || process.env.GHL_STAGE_ID_OTHER_FORMS || null
        const opportunity = await createOpportunity(contactId, opportunityData, [], pipelineId, stageId)
        console.log('✅ Lead Capture - Opportunity created successfully! ID:', opportunity?.id)
      } catch (oppError) {
        console.error('❌ Lead Capture - Error creating opportunity in GHL:', oppError.message)
        // Do not fail the whole request if only opportunity fails (contact was created)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your request has been submitted successfully. We will get back to you shortly.',
      contactId: contactId || null
    })
  } catch (error) {
    console.error('Lead Capture form submission error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request. Please try again.' },
      { status: 500 }
    )
  }
}
