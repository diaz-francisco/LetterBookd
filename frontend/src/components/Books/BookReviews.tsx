import React from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

interface BookReviewsProps {
  bookId: string;
  reviewsUpdated: number;
  onReviewSubmitted: () => void;
}

const BookReviews: React.FC<BookReviewsProps> = ({
  bookId,
  reviewsUpdated,
  onReviewSubmitted,
}) => {
  return (
    <div className="reviews-section">
      <ReviewForm 
        bookId={bookId} 
        bookSource="openLibrary" 
        onReviewSubmitted={onReviewSubmitted} 
      />
      <ReviewList key={reviewsUpdated} bookId={bookId} />
    </div>
  );
};

export default BookReviews;
