import { useParams } from "react-router-dom";
// import { useState } from "react";
import { useFetchBookDetails } from "../../hooks/useFetchBookDetails";
import "./styles/BookdDetails.css";

const BooksDetailPage: React.FC = () => {
  const { bookSlug } = useParams<{ bookSlug: string }>();

  const workId = bookSlug?.split("-").pop() || "";

  const { book, loading, error } = useFetchBookDetails(workId);
  // const [showMore, setShowmore] = useState(false);

  if (loading) return <div>Loading book details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!book) return <div>Book not found</div>;

  const getDescription = (description: any) => {
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

  const firstSentence = getFirstSentence();
  const subjects = getSubjects();

  return (
    <div className={`detail-text`}>
      {firstSentence ? (
        <div className="quote-overlay">
          <blockquote className="first-sentence">"{firstSentence}"</blockquote>
        </div>
      ) : null}

      {book.cover && <img className="bookImg" src={book.cover} alt={book.title} />}

      <div className="detail-content">
        <h1>{book.title}</h1>
        {book.authors && (
          <div className="authors-line">
            <span>{book.authors.map(a => a.name).join(", ")}</span>
          </div>
        )}
        {subjects && (
          <ul className="lists">
            {subjects.map((subject, index) => (
              <li key={index} className="chips">
                {subject}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="book-description">{getDescription(book.description)}</div>
    </div>
  );
};

export default BooksDetailPage;
