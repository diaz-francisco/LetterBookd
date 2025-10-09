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

  const getDescription = (description: any) => {
    if (typeof description === "string") {
      return description;
    }
    if (description && typeof description === "object" && description.value) {
      return description.value;
    }
    return "No description available";
  };

  return (
    <div>
      <h1>{book.title}</h1>
      {book.cover && <img src={book.cover} alt={book.title} />}
      <div>{getDescription(book.description)}</div>
      {}
    </div>
  );
};

export default BooksDetailPage;
