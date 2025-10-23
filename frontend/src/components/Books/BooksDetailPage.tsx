import { useParams } from "react-router-dom";
import { useState } from "react";
import { useFetchBookDetails } from "../../hooks/useFetchBookDetails";
import BookHeader from "./BookHeader";
import BookActions from "./BookActions";
import BookDescription from "./BookDescription";

import BookReviews from "./BookReviews";
import "./styles/BookdDetails.css";

const BooksDetailPage: React.FC = () => {
  const { bookSlug } = useParams<{ bookSlug: string }>();
  const workId = bookSlug?.split("-").pop() || "";
  const { book, loading, error } = useFetchBookDetails(workId);
  const [showMore, setShowmore] = useState(false);
  const [reviewsUpdated, setReviewsUpdated] = useState(0);

  if (loading) return <div>Loading book details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!book) return <div>Book not found</div>;

  const getDescription = (description: string | { value: string } | undefined) => {
    if (typeof description === "string") {
      return description;
    }
    if (description && typeof description === "object" && description.value) {
      return description.value;
    }
    return "No description available";
  };

  const getFirstSentence = () => {
    if (!book.excerpts || book.excerpts.length === 0) return null;

    const firstSentenceExcerpt = book.excerpts.find(e => e.page === "First sentence") || book.excerpts[0];

    if (!firstSentenceExcerpt) return null;

    return typeof firstSentenceExcerpt.excerpt === "string"
      ? firstSentenceExcerpt.excerpt
      : firstSentenceExcerpt.excerpt.value;
  };

  const getSubjects = () => {
    if (!book.subjects || book.subjects.length === 0) return null;

    return book.subjects
      .filter(subject => {
        const lower = subject.toLowerCase();
        return (
          !lower.includes("accessible book") &&
          !lower.includes("in library") &&
          !lower.includes("protected daisy") &&
          subject.length < 50
        );
      })
      .slice(0, 3);
  };

  const handleReviewSubmitted = () => {
    setReviewsUpdated(prev => prev + 1);
  };

  const firstSentence = getFirstSentence();
  const subjects = getSubjects();
  const description = getDescription(book.description);

  return (
    <div className={`detail-text`}>
      {firstSentence && (
        <div className="quote-overlay">
          <blockquote className="first-sentence">"{firstSentence}"</blockquote>
        </div>
      )}

      <BookHeader book={book} subjects={subjects} />

      <BookActions />

      <BookDescription description={description} showMore={showMore} setShowMore={setShowmore} />

      <BookReviews bookId={workId} reviewsUpdated={reviewsUpdated} onReviewSubmitted={handleReviewSubmitted} />
    </div>
  );
};

export default BooksDetailPage;
