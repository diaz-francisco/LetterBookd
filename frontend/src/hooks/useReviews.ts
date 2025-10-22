import { useState, useEffect } from "react";
import { getReviewsByBookId, Review } from "../services/reviews";

export function useReviews(bookId: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookId) return;

    async function fetchReviews() {
      setLoading(true);
      setError(null);

      try {
        const reviewsData = await getReviewsByBookId(bookId);
        setReviews(reviewsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [bookId]);

  const addReview = (newReview: Review) => {
    setReviews(prev => [newReview, ...prev]);
  };

  return { reviews, loading, error, addReview };
}
