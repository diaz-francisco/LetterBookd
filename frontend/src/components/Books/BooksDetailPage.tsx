import { useParams } from "react-router-dom";
import { useFetchBookDetails } from "../../hooks/useFetchBookDetails";

const BooksDetailPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { book, loading, error } = useFetchBookDetails(bookId || "");

  if (loading) return <div>Loading book details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      {book.cover && <img src={book.cover} alt={book.title} />}
      {/* Add more book details here */}
    </div>
  );
};

export default BooksDetailPage;
