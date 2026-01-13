'use client';
import { useState } from 'react';

export default function FeedbackForm({ initialRating, token }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/reviews/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          rating: initialRating,
          token
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="success-message">
        <div className="success-icon">✅</div>
        <h2>Thank you for your feedback!</h2>
        <p>We appreciate you taking the time to help us improve our services.</p>
        <p>Your input will help us serve you and others better in the future.</p>
      </div>
    );
  }

  return (
    <div className="feedback-form-container">
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="rating-display">
          <span className="rating-stars">
            {'★'.repeat(initialRating)}
          </span>
          <span className="rating-text">
            {initialRating} star{initialRating > 1 ? 's' : ''} - {initialRating <= 2 ? 'Poor' : 'Fair'}
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name (optional)</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Email or Phone (optional)</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your.email@example.com"
          />
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">How can we improve? *</label>
          <textarea
            id="message"
            required
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            placeholder="Please share your experience and let us know what we could have done better..."
            rows={4}
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !formData.message.trim()}
          className="submit-button"
        >
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>

      <style jsx>{`
        .feedback-form-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
        }

        .success-message {
          text-align: center;
          padding: 3rem 2rem;
          background: #f0f9ff;
          border-radius: 0.5rem;
          border: 1px solid #0ea5e9;
        }

        .success-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .success-message h2 {
          color: #0f172a;
          margin-bottom: 1rem;
        }

        .success-message p {
          color: #64748b;
          margin-bottom: 0.5rem;
        }

        .rating-display {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding: 1rem;
          background: #fef3c7;
          border-radius: 0.5rem;
        }

        .rating-stars {
          color: #f59e0b;
          font-size: 1.5rem;
        }

        .rating-text {
          color: #92400e;
          font-weight: 500;
        }

        .feedback-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 500;
          color: #374151;
        }

        .form-group input,
        .form-group textarea {
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          font-size: 1rem;
          transition: border-color 0.2s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-group input[type="tel"] {
          margin-top: 0.5rem;
        }

        .error-message {
          color: #dc2626;
          background: #fef2f2;
          padding: 0.75rem;
          border-radius: 0.375rem;
          border: 1px solid #fecaca;
          font-size: 0.875rem;
        }

        .submit-button {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.375rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .submit-button:hover:not(:disabled) {
          background: #2563eb;
        }

        .submit-button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}