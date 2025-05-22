import React from "react";
import { useSearchParams } from "react-router-dom";
import "./styles/BooksPage.css";
import { useFetchBook } from "../../hooks/useFetchBook";
import BookCard from "./BookCard";

const BooksPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("qeury") || "House of Leaves";

  const { books, loading } = useFetchBook(query);

  return (
    <div>
      <form>
        <h1>Look for a book</h1>
        <input type="text"></input>
      </form>
      {loading ? (
        <p>Fetching books...</p>
      ) : (
        <div className="container">
          {books.map((book, index) => (
            <BookCard key={book.key || index} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksPage;
