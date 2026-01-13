import { NextResponse } from 'next/server';
import { validateReviewToken, markTokenUsed } from '@/lib/reviewTokens';
import { processNegativeReview } from '@/lib/reviewProcessor';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { rating, name, email, phone, message, token } = body;

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required for review submissions' },
        { status: 400 }
      );
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Feedback message is required' },
        { status: 400 }
      );
    }

    if (rating > 3) {
      return NextResponse.json(
        { error: 'This form is only for negative reviews (1-3 stars)' },
        { status: 400 }
      );
    }

    let tokenData = null;
    if (token === 'anonymous') {
      // For anonymous reviews, create a mock token data
      tokenData = {
        id: `anonymous-${Date.now()}`,
        project_type: 'anonymous-review',
        client_name: name.trim(), // Now required
        client_email: email || null,
        client_phone: phone || null
      };
    } else {
      // Validate real token
      tokenData = await validateReviewToken(token);
    }

    // Process the negative review
    const result = await processNegativeReview({
      rating,
      name,
      email,
      phone,
      message,
      tokenData
    });

    // Mark token as used (only for real tokens)
    if (token !== 'anonymous') {
      await markTokenUsed(token);
    }

    // Save submission record (for all reviews - analytics & tracking)
    await supabase.from('review_submissions').insert({
      token_id: tokenData.id,
      rating,
      feedback: message,
      contact_id: result.contactId,
      is_negative: true,
      is_anonymous: token === 'anonymous',
      ghl_opportunity_id: result.opportunityId,
      client_name: name.trim(), // Now required and trimmed
      client_email: email || null,
      client_phone: phone || null,
      project_type: tokenData.project_type,
      project_id: tokenData.project_id
    });

    return NextResponse.json({
      success: true,
      contactId: result.contactId,
      opportunityId: result.opportunityId
    });

  } catch (error) {
    console.error('Feedback submission error:', error);

    if (error.message.includes('Invalid or expired review token')) {
      return NextResponse.json(
        { error: 'Invalid or expired review token' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to process feedback' },
      { status: 500 }
    );
  }
}