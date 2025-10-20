import React, { useState, useEffect } from "react";
import { useAuth } from "../../services/auth";
import { getReviewsByBookId, updateReview, deleteReview, type Review } from "../../services/reviews";

interface ReviewListProps {
  bookId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ bookId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const reviewsData = await getReviewsByBookId(bookId);
        setReviews(reviewsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [bookId]);

  const handleEdit = (review: Review) => {
    if (!user) {
      setError("Please sign in to edit reviews");
      return;
    }
    setEditingReview(review._id);
    setEditText(review.review);
  };

  const handleSaveEdit = async (reviewId: string) => {
    try {
      await updateReview(reviewId, editText);
      setEditingReview(null);
      setEditText("");
      // Refresh reviews by calling the API again
      const reviewsData = await getReviewsByBookId(bookId);
      setReviews(reviewsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update review");
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!user) {
      setError("Please sign in to delete reviews");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await deleteReview(reviewId);
      // Refresh reviews by calling the API again
      const reviewsData = await getReviewsByBookId(bookId);
      setReviews(reviewsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete review");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="review-list">
      <h3>Reviews ({reviews.length})</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review this book!</p>
      ) : (
        <div className="reviews">
          {reviews.map(review => (
            <div key={review._id} className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <span className="reviewer-name">{review.user.name}</span>
                  <span className="review-date">{formatDate(review.createdAt)}</span>
                </div>
                {/* Only show edit/delete buttons if user is authenticated AND owns the review */}
                {user && user._id === review.user._id && (
                  <div className="review-actions">
                    <button onClick={() => handleEdit(review)}>Edit</button>
                    <button onClick={() => handleDelete(review._id)}>Delete</button>
                  </div>
                )}
              </div>

              {editingReview === review._id ? (
                <div className="edit-form">
                  <textarea value={editText} onChange={e => setEditText(e.target.value)} rows={3} />
                  <div className="edit-actions">
                    <button onClick={() => handleSaveEdit(review._id)}>Save</button>
                    <button onClick={() => setEditingReview(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="review-content">{review.review}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
