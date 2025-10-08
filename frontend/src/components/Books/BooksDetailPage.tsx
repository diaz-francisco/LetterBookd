import { useParams } from "react-router-dom";
import { useFetchBookDetails } from "../../hooks/useFetchBookDetails";

const BooksDetailPage: React.FC = () => {
  const { bookSlug } = useParams<{ bookSlug: string }>();

  const workId = bookSlug?.split("-").pop() || "";

  const { book, loading, error } = useFetchBookDetails(workId);

  console.log("Book:", book);

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
