import { useParams } from "react-router-dom";
import { useFetchBookDetails } from "../../hooks/useFetchBookDetails";
import "./styles/BookdDetails.css";

const BooksDetailPage: React.FC = () => {
  const { bookSlug } = useParams<{ bookSlug: string }>();

  const workId = bookSlug?.split("-").pop() || "";

  const { book, loading, error } = useFetchBookDetails(workId);

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

  console.log(book);

  return (
    <div className="detail-text">
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
      <h4>{book.number_of_pages}</h4>
      {book.cover && <img className="bookImg" src={book.cover} alt={book.title} />}
      <div>{getDescription(book.description)}</div>
      {}
    </div>
  );
};

export default BooksDetailPage;
