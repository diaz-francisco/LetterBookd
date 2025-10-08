import React from "react";
import { Link } from "react-router-dom";
import slugify from "slugify";
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
  const createSlug = (title: string, workId: string) => {
    const slug = slugify(title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });
    return `${slug}-${workId}`;
  };

  const workId = book.key.replace("/works/", "");
  const bookSlug = book.title ? createSlug(book.title, workId) : workId;

  return (
    <div className="book-grid">
      <Link to={`/books/${bookSlug}`}>
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
