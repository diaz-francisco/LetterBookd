import React from "react";
import { Link } from "react-router-dom";
import "./styles/BooksPage.css";

interface Book {
  key: string;
  cover_i?: number;
  title?: string;
}

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  // Remove leading slash from book.key to avoid double slashes
  const cleanKey = book.key.startsWith("/") ? book.key.slice(1) : book.key;

  return (
    <div className="book-grid">
      <Link to={`/books/${cleanKey}`}>
        <img
          src={
            book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
              : "https://raw.githubusercontent.com/MrCheks/FilmSearch/756265bcd9696223d2193fa8c4cbd98a6e55040c/image-missing.svg"
          }
          alt={book.title || "Book cover"}
        />
      </Link>
    </div>
  );
};

export default BookCard;
