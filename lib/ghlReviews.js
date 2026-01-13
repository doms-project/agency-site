/**
 * Separate GHL Integration for Review System
 * Completely independent from form submission system
 */

const GHL_API_URL = process.env.GHL_API_URL || 'https://services.leadconnectorhq.com';
const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

/**
 * Validate contact data for reviews
 */
function validateReviewContactData(data) {
  const errors = [];

  if (!data.ownerContact || typeof data.ownerContact !== 'string' || data.ownerContact.trim().length === 0) {
    errors.push('Contact name is required');
  }

  // Phone is optional for reviews
  if (data.phone && typeof data.phone === 'string' && data.phone.trim()) {
    // Validate phone format - be less strict for reviews
    const digitsOnly = data.phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      errors.push('Phone number must have at least 10 digits');
    }
  }

  if (data.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Email address must be in valid format');
    }
  }

  if (errors.length > 0) {
    throw new Error(`Review contact validation failed: ${errors.join(', ')}`);
  }

  return true;
}

/**
 * Create contact specifically for reviews
 */
export async function createReviewContact(data) {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    throw new Error('GoHighLevel API credentials not configured for reviews');
  }

  // Validate data
  validateReviewContactData(data);

  const contactData = {
    firstName: data.ownerContact.trim(),
    lastName: '',
    email: data.email || '',
    phone: data.phone || '',
    locationId: GHL_LOCATION_ID,
    source: 'Review System',
    tags: data.tags || ['negative-review']
  };

  const response = await fetch(`${GHL_API_URL}/contacts/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GHL_API_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    },
    body: JSON.stringify(contactData)
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorData;
    try {
      errorData = JSON.parse(errorText);
    } catch (e) {
      errorData = null;
    }

    // Handle duplicate contact error - return existing contact info
    if (response.status === 400 && errorData?.message?.includes('duplicated contacts') && errorData?.meta?.contactId) {
      console.log('Duplicate contact found, using existing contact:', errorData.meta.contactId);
      return {
        id: errorData.meta.contactId,
        isExisting: true,
        ...errorData.meta
      };
    }

    throw new Error(`Failed to create review contact: ${errorText}`);
  }

  const result = await response.json();

  // Add custom fields for review data
  if (data.customFields && data.customFields.length > 0) {
    await updateReviewContactFields(result.contact.id, data.customFields);
  }

  return result.contact;
}

/**
 * Update contact custom fields for reviews
 */
export async function updateReviewContactFields(contactId, customFields) {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    throw new Error('GoHighLevel API credentials not configured for reviews');
  }

  const response = await fetch(`${GHL_API_URL}/contacts/${contactId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${GHL_API_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    },
    body: JSON.stringify({
      customFields: customFields
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update review contact fields: ${errorText}`);
  }

  return await response.json();
}

/**
 * Add internal note to review contact
 */
export async function addReviewContactNote(contactId, note) {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    throw new Error('GoHighLevel API credentials not configured for reviews');
  }

  const response = await fetch(`${GHL_API_URL}/contacts/${contactId}/notes`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GHL_API_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    },
    body: JSON.stringify({
      body: note
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to add review note: ${errorText}`);
    return; // Don't throw - notes are not critical, and don't try to parse response again
  }

  return await response.json();
}

/**
 * Create opportunity for review reputation recovery
 */
export async function createReviewOpportunity(contactId, data) {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    throw new Error('GoHighLevel API credentials not configured for reviews');
  }

  const opportunityData = {
    name: data.name || 'Negative Review Opportunity',
    contactId: contactId,
    pipelineId: data.pipelineId,
    pipelineStageId: data.stageId, // This should be pipelineStageId, not stageId
    status: 'open',
    monetaryValue: 0,
    source: 'Review System',
    customFields: data.customFields || [],
    locationId: GHL_LOCATION_ID // locationId goes in the request body
  };

  const response = await fetch(`${GHL_API_URL}/opportunities/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GHL_API_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    },
    body: JSON.stringify(opportunityData)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create review opportunity: ${errorText}`);
  }

  return await response.json();
}