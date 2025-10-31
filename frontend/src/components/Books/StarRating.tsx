import React from "react";
import "./styles/StarRating.css";

interface StarRatingProps {
  value: number; // 0-5, in 0.5 increments
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: "small" | "medium" | "large";
  showValue?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  readOnly = false,
  size = "medium",
  showValue = false,
}) => {
  const maxStars = 5;

  const handleStarClick = (clickedValue: number) => {
    if (!readOnly && onChange) {
      onChange(clickedValue);
    }
  };

  const getStarClass = (step: number) => {
    if (value >= step) return "star filled";
    if (value > 0 && value >= step - 0.5) return "star half"; // Added value > 0 check
    return "star empty";
  };

  return (
    <div className={`star-rating ${size} ${readOnly ? "readonly" : ""}`}>
      <div className="stars-container">
        {Array.from({ length: maxStars }, (_, i) => {
          const starValue = (i + 1) * 1.0;

          return (
            <button
              key={i}
              type="button"
              className={getStarClass(starValue)}
              onClick={() => handleStarClick(starValue)}
              onMouseEnter={e => {
                if (!readOnly) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const isHalf = x < rect.width / 2;
                  const halfValue = starValue - 0.5;
                  if (isHalf && halfValue >= 0.5) {
                    e.currentTarget.classList.add("hover-half");
                  }
                }
              }}
              disabled={readOnly}
              aria-label={`${starValue} stars`}
            >
              <span className="star-icon">★</span>
            </button>
          );
        })}
      </div>
      {showValue && value > 0 && <span className="rating-value">{value.toFixed(1)}</span>}
    </div>
  );
};

export default StarRating;
