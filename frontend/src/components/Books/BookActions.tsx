import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Heart } from "lucide-react";
import "./styles/BookActions.css";

const BookActions: React.FC = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleLiked = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setIsAnimating(true);

    // Show notification
    toast(`You have ${newLikedState ? "liked" : "unliked"} the book`);

    // Reset animation after a short delay
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="action-hero">
      <div className="action-modal">
        <div className="like-system">
          <button onClick={toggleLiked} className={`like-button ${isAnimating ? "animating" : ""}`}>
            <Heart className={`heart-icon ${isLiked ? "liked" : "not-liked"} ${isAnimating ? "pulse" : ""}`} />
          </button>
          {/* <ToastContainer /> */}
        </div>
      </div>
    </div>
  );
};

export default BookActions;
