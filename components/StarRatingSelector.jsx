'use client';
import { useState } from 'react';

export default function StarRatingSelector({ onSelect }) {
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
          gap: 1rem;
          padding: 2rem;
        }

        .stars-container {
          display: flex;
          gap: 0.5rem;
        }

        .star-button {
          background: none;
          border: none;
          font-size: 3rem;
          color: #ddd;
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
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}