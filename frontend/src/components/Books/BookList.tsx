import BookCard from "./BookCard";

interface BookListProps {
  books: Array<{
    key: string;
    cover_i?: number;
    title?: string;
  }>;
  loading: boolean;
}

const BookList: React.FC<BookListProps> = ({ books, loading }) => {
  if (loading) return <p>Fetching books...</p>;

  return (
    <div className="container">
      {books.map(book => (
        <BookCard key={book.key} book={book} />
      ))}
    </div>
  );
};

export default BookList;
