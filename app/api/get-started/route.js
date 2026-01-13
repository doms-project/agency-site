import { NextResponse } from 'next/server'
import { createContact, createOpportunity } from '@/lib/ghlIntegration'
import { formatPhoneNumber } from '@/lib/utils/phoneFormatter'
import { supabase } from '@/lib/supabase'
import { generateReviewToken } from '@/lib/reviewTokens'

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
      preferredDate,
      preferredTime,
      timezone,
      agreeToTerms
    } = body

    // Validate required fields
    if (!firstName || !phone || !email) {
      return NextResponse.json(
        { error: 'First Name, Phone, and Email are required fields' },
        { status: 400 }
      )
    }

    // Validate time selection fields
    if (!preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: 'Please select your preferred date and time for the strategy call' },
        { status: 400 }
      )
    }

    if (!agreeToTerms) {
      return NextResponse.json(
        { error: 'You must agree to the terms and conditions' },
        { status: 400 }
      )
    }

    // Validate minimum notice period for strategy consultations
    try {
      const now = new Date()
      const bookingDateTime = new Date(`${preferredDate}T${preferredTime}`)
      const timeDiffHours = (bookingDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)

      // Check if this is a same-day booking
      const today = new Date().toISOString().split('T')[0]
      const isSameDay = preferredDate === today

      if (isSameDay) {
        const MINIMUM_NOTICE_HOURS = 6 // Strategy consultations require preparation time

        if (timeDiffHours < MINIMUM_NOTICE_HOURS) {
          // Calculate next available time (6 hours from now)
          const nextAvailable = new Date(now.getTime() + (MINIMUM_NOTICE_HOURS * 60 * 60 * 1000))
          const nextAvailableTime = nextAvailable.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })

          // Find next available date (tomorrow)
          const tomorrow = new Date(now)
          tomorrow.setDate(tomorrow.getDate() + 1)
          const tomorrowFormatted = tomorrow.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })

          return NextResponse.json(
            {
              error: `Strategy consultations require ${MINIMUM_NOTICE_HOURS} hours advance notice for proper preparation. Next available: ${tomorrowFormatted} at 8:00 AM, or today after ${nextAvailableTime}.`
            },
            { status: 400 }
          )
        }
      }
    } catch (error) {
      console.error('Time validation error:', error)
      // Continue with booking if time validation fails (don't block legitimate bookings)
    }

    // Check availability before proceeding (includes 3-day block check)
    // TEMPORARILY BYPASSED FOR DEBUGGING - Availability check failing despite Supabase keys
    /*
    try {
      const availabilityResponse = await fetch(`/api/check-availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: preferredDate,
          time: preferredTime,
          checkSingleTime: true,
          timezone: timezone
        }),
      })

      const availabilityResult = await availabilityResponse.json()

      if (!availabilityResponse.ok || !availabilityResult.available) {
        return NextResponse.json(
          { error: availabilityResult.message || 'Sorry, this time slot is no longer available. Please select another time.' },
          { status: 409 }
        )
      }
    } catch (error) {
      console.error('Availability verification error:', error)
      return NextResponse.json(
        { error: 'Unable to verify time availability. Please try again.' },
        { status: 500 }
      )
    }
    */

    // Format phone number to E.164 format
    const formattedPhone = formatPhoneNumber(phone)

    // Create booking record in Supabase first
    let bookingRecord
    try {
      console.log('📅 Creating booking record in Supabase...')
      console.log('   Date:', preferredDate)
      console.log('   Time:', preferredTime)
      console.log('   Timezone:', timezone || 'Auto-detected')

      const { data: booking, error: bookingError } = await supabase
        .from('strategy_calls')
        .insert({
          contact_name: `${firstName} ${lastName || ''}`.trim(),
          contact_email: email.trim(),
          contact_phone: formattedPhone,
          preferred_date: preferredDate,
          preferred_time: preferredTime,
          timezone: timezone || 'America/New_York',
          notes: message || 'Strategy consultation requested via website form (includes 2-day follow-up buffer)',
          status: 'pending',
          duration: 30 // 30-minute consultation
        })
        .select()
        .single()

      if (bookingError) {
        console.error('❌ Booking creation error:', bookingError)
        return NextResponse.json(
          { error: 'Failed to create booking record. Please try again.' },
          { status: 500 }
        )
      }

      bookingRecord = booking
      console.log('✅ Booking created successfully!')
      console.log('   Booking ID:', bookingRecord.id)
    } catch (error) {
      console.error('❌ Supabase booking error:', error)
      return NextResponse.json(
        { error: 'Database connection error. Please try again.' },
        { status: 500 }
      )
    }

    // Prepare contact data with Strategy Call tag
    const contactData = {
      ownerContact: `${firstName} ${lastName || ''}`.trim(),
      email: email.trim(),
      phone: formattedPhone,
      businessName: '',
      businessAddress: '',
      source: 'Get Started Form',
      tags: ['Get Started Form', 'Strategy Call', 'New Lead'],
      // Add scheduling info for GHL custom fields
      preferredDate,
      preferredTime,
      timezone: timezone || 'America/New_York'
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

      // Update Supabase booking with GHL contact ID
      if (contact?.id && bookingRecord?.id) {
        try {
          console.log('🔗 Linking booking to GHL contact...')
          const { error: updateError } = await supabase
            .from('strategy_calls')
            .update({ ghl_contact_id: contact.id })
            .eq('id', bookingRecord.id)

          if (updateError) {
            console.error('⚠️  Failed to link booking to contact:', updateError)
          } else {
            console.log('✅ Booking linked to contact successfully!')
          }
        } catch (linkError) {
          console.error('⚠️  Error linking booking to contact:', linkError)
          // Don't fail the whole request for this
        }
      }
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
      gsPreferredDate: preferredDate,
      gsPreferredTime: preferredTime,
      gsTimezone: timezone || 'America/New_York',
      gsBookingStatus: bookingRecord?.status || 'pending',
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

        // Store the GHL opportunity ID for future updates
        if (opportunity?.id) {
          try {
            console.log('🔗 Storing GHL opportunity ID...')
            const { error: updateError } = await supabase
              .from('strategy_calls')
              .update({ ghl_opportunity_id: opportunity.id })
              .eq('id', bookingRecord.id)

            if (updateError) {
              console.error('⚠️ Failed to store opportunity ID:', updateError)
            } else {
              console.log('✅ Opportunity ID stored successfully!')
            }
          } catch (linkError) {
            console.error('⚠️ Error storing opportunity ID:', linkError)
          }
        }
      } catch (error) {
        console.error('❌ Error creating opportunity in GHL:')
        console.error('   Error Message:', error.message)
        // Continue even if opportunity creation fails
      }
    }

    // Generate review token for future feedback collection
    let reviewToken = null;
    try {
      if (contact && bookingRecord) {
        reviewToken = await generateReviewToken({
          name: `${firstName} ${lastName || ''}`.trim(),
          email: email,
          phone: formattedPhone,
          projectId: bookingRecord.id,
          projectType: 'strategy-call'
        });
        console.log('✅ Review token generated for strategy call:', reviewToken.token);
      }
    } catch (tokenError) {
      console.error('⚠️ Failed to generate review token:', tokenError);
      // Don't fail the main request for this
    }

    return NextResponse.json({
      success: true,
      message: 'Strategy call scheduled successfully!',
      contactId: contact?.id || null,
      bookingId: bookingRecord?.id || null,
      reviewToken: reviewToken?.token || null,
      scheduledDate: preferredDate,
      scheduledTime: preferredTime,
      timezone: timezone || 'America/New_York'
    })
  } catch (error) {
    console.error('Get Started submission error:', error)
    
    return NextResponse.json(
      { error: error.message || 'An error occurred while processing your submission. Please try again.' },
      { status: 500 }
    )
  }
}

