'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import StarRatingSelector from '@/components/StarRatingSelector';
import FeedbackForm from '@/components/FeedbackForm';

export default function ReviewPage() {
  const params = useParams();
  const [rating, setRating] = useState(0);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const handleRatingSelect = (selectedRating) => {
    if (selectedRating >= 4) {
      // Redirect to Google Business Profile
      window.location.href = process.env.NEXT_PUBLIC_GBP_REVIEW_URL;
    } else {
      setRating(selectedRating);
      setShowFeedbackForm(true);
    }
  };

  if (showFeedbackForm) {
    return (
      <div className="review-container">
        <h1>We'd love to hear how we can improve</h1>
        <FeedbackForm
          initialRating={rating}
          token={params.token}
        />
      </div>
    );
  }

  return (
    <div className="review-container">
      <h1>How was your experience?</h1>
      <StarRatingSelector onSelect={handleRatingSelect} />
      <p className="review-disclaimer">
        Your feedback helps us improve our services.
      </p>
    </div>
  );
}