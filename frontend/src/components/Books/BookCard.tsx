import React from "react";
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
  return (
    <div className="book-grid">
      <a href={`/books/${book.key}`}>
        <img
          src={
            book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
              : "https://raw.githubusercontent.com/MrCheks/FilmSearch/756265bcd9696223d2193fa8c4cbd98a6e55040c/image-missing.svg"
          }
          alt={book.title || "Book cover"}
        />
      </a>
    </div>
  );
};

export default BookCard;
