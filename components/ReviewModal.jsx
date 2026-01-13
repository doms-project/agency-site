'use client';
import { useState } from 'react';

export default function ReviewModal({ isOpen, onClose }) {
  const [rating, setRating] = useState(0);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const handleRatingSelect = (selectedRating) => {
    if (selectedRating >= 4) {
      // Redirect to Google Business Profile
      window.location.href = process.env.NEXT_PUBLIC_GBP_REVIEW_URL || 'https://g.page/your-business/review';
    } else {
      setRating(selectedRating);
      setShowFeedbackForm(true);
    }
  };

  const handleClose = () => {
    setRating(0);
    setShowFeedbackForm(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Share Your Experience
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>

          {!showFeedbackForm ? (
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                How was your experience?
              </h3>
              <StarRatingSelector onSelect={handleRatingSelect} />
              <p className="text-gray-400 text-sm mt-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Your feedback is anonymous and helps us improve our services
              </p>
            </div>
          ) : (
            <FeedbackForm
              initialRating={rating}
              onClose={handleClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function StarRatingSelector({ onSelect }) {
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className="star-rating-selector">
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onSelect(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className={`star-button ${star <= hoveredRating ? 'hovered' : ''}`}
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          >
            ★
          </button>
        ))}
      </div>
      <div className="rating-labels">
        <span>Poor</span>
        <span>Excellent</span>
      </div>
      <style jsx>{`
        .star-rating-selector {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          padding: 2rem 0;
        }

        .stars-container {
          display: flex;
          gap: 1rem;
        }

        .star-button {
          background: none;
          border: none;
          font-size: 3rem;
          color: #6b7280;
          cursor: pointer;
          transition: color 0.2s ease;
          padding: 0.5rem;
          border-radius: 0.25rem;
        }

        .star-button:hover,
        .star-button.hovered {
          color: #fbbf24;
        }

        .rating-labels {
          display: flex;
          justify-content: space-between;
          width: 200px;
          font-size: 0.875rem;
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
}

function FeedbackForm({ initialRating, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation - only message is required for negative feedback
    if (!formData.message.trim()) {
      setError('Please share your feedback');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/reviews/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          rating: initialRating,
          token: 'anonymous' // Special token for anonymous reviews
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Failed to submit feedback');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center">
        <div className="text-green-400 text-6xl mb-6">✓</div>
        <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Thank You for Your Feedback!
        </h3>
        <p className="text-gray-300 mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          We appreciate you taking the time to help us improve. Your input is valuable to us.
        </p>
        <button
          onClick={onClose}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          {'★'.repeat(initialRating).split('').map((star, i) => (
            <span key={i} className="text-yellow-400 text-2xl">{star}</span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          We'd Love to Hear More
        </h3>
        <p className="text-gray-300 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Help us understand how we can improve
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white/90 mb-2 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Name (optional)
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-white/90 mb-2 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Email (optional)
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label className="block text-white/90 mb-2 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Phone <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-white/90 mb-2 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            How can we improve? <span className="text-red-400">*</span>
          </label>
          <textarea
            required
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
            placeholder="Please share your experience and let us know what we could have done better..."
            rows={4}
          />
        </div>

        {error && (
          <div className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg p-3">
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors text-sm"
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </form>
    </div>
  );
}