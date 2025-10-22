import React, { useState, useEffect } from "react";
import { useAuth } from "../../services/auth";
import { createReview, type CreateReviewData } from "../../services/reviews";

interface ReviewFormProps {
  bookId: string;
  bookSource?: string;
  onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ bookId, bookSource, onReviewSubmitted }) => {
  const { user } = useAuth();
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [modalOpen]);

  if (!user) {
    return (
      <div className="review-form">
        <p>Please sign in to leave a review.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    setIsSubmitting(true);
    setError("");

    try {
      const reviewData: CreateReviewData = {
        bookId,
        bookSource: bookSource || "openLibrary",
        review: reviewText.trim(),
      };

      await createReview(reviewData);
      setReviewText("");
      onReviewSubmitted();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-form">
      <h3>Leave a Review</h3>
      <div>
        <button>Leave a Review</button>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
          placeholder="Share your thoughts about this book..."
          maxLength={1500}
          rows={4}
          required
        />
        <div className="char-count">{reviewText.length}/1500 characters</div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={isSubmitting || !reviewText.trim()}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
