import { createReviewContact, addReviewContactNote, createReviewOpportunity } from '@/lib/ghlReviews';

export async function processNegativeReview({ rating, name, email, phone, message, tokenData }) {
  try {
    const reviewData = {
      review_rating: rating,
      review_message: message,
      review_date: new Date().toISOString(),
      project_type: tokenData.project_type,
      project_id: tokenData.project_id
    };

    // Create new contact for review (personal details with required name)
    const contactData = {
      ownerContact: name.trim(),
      email: email || '',
      phone: phone || '',
      tags: ['negative-review'],
      source: 'Review System'
    };

    const contact = await createReviewContact(contactData);

    // Check if this is an existing contact (duplicate found)
    const isExisting = contact.isExisting || false;

    // Add internal note
    await addReviewContactNote(contact.id,
      `${isExisting ? 'Additional' : 'New'} negative review (${rating} stars) for ${tokenData.project_type}:\n${message}`
    );

    // Create reputation recovery opportunity
    const opportunity = await createReviewOpportunity(contact.id, {
      name: `${name} - Reputation Recovery - ${rating} Star Review (${tokenData.project_type})`,
      pipelineId: process.env.GHL_REPUTATION_PIPELINE_ID || process.env.GHL_PIPELINE_ID,
      stageId: process.env.GHL_NEGATIVE_REVIEW_STAGE_ID || process.env.GHL_STAGE_ID,
      customFields: [
        { key: 'customer_name', field_value: name },
        { key: 'customer_email', field_value: email || '' },
        { key: 'customer_phone', field_value: phone || '' },
        ...Object.entries(reviewData).map(([key, value]) => ({
          key,
          field_value: value
        }))
      ]
    });

    return { contactId: contact.id, opportunityId: opportunity?.id, isNew: !isExisting };

  } catch (error) {
    console.error('Error processing negative review:', error);
    throw error;
  }
}