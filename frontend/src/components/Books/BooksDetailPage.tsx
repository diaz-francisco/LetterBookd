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
      .slice(0, 5);
  };

  const firstSentence = getFirstSentence();
  const subjects = getSubjects();

  // const displayMore = showMore ? subjects : subjects.slice(0, 5);

  return (
    <div className="detail-text">
      {firstSentence ? (
        <div className="quote-overlay">
          <blockquote className="first-sentence">"{firstSentence}"</blockquote>
          <cite>— {book.title}</cite>
        </div>
      ) : (
        <> </>
      )}
      <h1>{book.title}</h1>
      {book.authors && book.authors.length > 0 && (
        <div>
          {book.authors.length > 1 ? <h3>Authors:</h3> : <h3>Author:</h3>}
          <ul>
            {book.authors.map((author, index) => (
              <li key={index}>{author.name}</li>
            ))}
          </ul>
        </div>
      )}
      {book.cover && <img className="bookImg" src={book.cover} alt={book.title} />}
      <div>Description: {getDescription(book.description)}</div>
      <div>
        {subjects && (
          <ul>
            <li>{subjects.map(e => `${e}`)}</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default BooksDetailPage;
