import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import { useAuth } from "../../services/auth";
import { getUserLike, createOrUpdateLike, updateRating, deleteLike, Like } from "../../services/likes";
import StarRating from "./StarRating";
import "./styles/BookActions.css";

const BookActions: React.FC = () => {
  const { bookSlug } = useParams<{ bookSlug: string }>();
  const workId = bookSlug?.split("-").pop() || "";
  const { user } = useAuth();
  const [userLike, setUserLike] = useState<Like | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!user || !workId) {
      setLoading(false);
      return;
    }

    const fetchUserLike = async () => {
      try {
        const like = await getUserLike(workId);
        setUserLike(like);
      } catch (err) {
        console.error("Failed to fetch user like:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserLike();
  }, [user, workId]);

  const handleRatingChange = async (rating: number) => {
    if (!user || !rating || rating === 0) return;

    try {
      setIsAnimating(true);
      if (userLike) {
        // Update existing like
        const updated = await updateRating(workId, rating);
        setUserLike(updated);
      } else {
        // Create new like with rating
        const newLike = await createOrUpdateLike({
          bookId: workId,
          bookSource: "openLibrary", // Add this if needed
          status: "Read",
          rating,
        });
        setUserLike(newLike);
      }
    } catch (err) {
      console.error("Failed to update rating:", err);
      // Show user-friendly error message
      alert(err instanceof Error ? err.message : "Failed to save rating");
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const toggleLike = async () => {
    if (!user) return;

    try {
      setIsAnimating(true);
      if (userLike) {
        await deleteLike(workId);
        setUserLike(null);
      } else {
        const newLike = await createOrUpdateLike({
          bookId: workId,
          bookSource: "openLibrary",
          status: "Read",
        });
        setUserLike(newLike);
      }
    } catch (err) {
      console.error("Failed to toggle like:", err);
      alert(err instanceof Error ? err.message : "Failed to like book");
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="action-hero">
      <div className="action-modal">
        {user ? (
          <>
            <div className="rating-system">
              <StarRating value={userLike?.rating || 0} onChange={handleRatingChange} showValue />
            </div>
            <div className="like-system">
              <button onClick={toggleLike} className={`like-button ${isAnimating ? "animating" : ""}`}>
                <Heart className={`heart-icon ${userLike ? "liked" : "not-liked"} ${isAnimating ? "pulse" : ""}`} />
              </button>
            </div>
          </>
        ) : (
          <p>Sign in to rate and like books</p>
        )}
      </div>
    </div>
  );
};

export default BookActions;
