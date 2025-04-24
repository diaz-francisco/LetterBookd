import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "../components/LandingPage/BooksPage.css";
import { useFetchBook } from "../hooks/useFetchBook";

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
        <div style={{ border: "1px solid black" }}>
          <h2>Results for: {query}</h2>
          <p style={{ display: "flex", justifyContent: "center" }}>Found {books?.length} books</p>
          {/* <button onClick={() => console.log(books)}>Log Books to Console</button> */}
          <div className="container">
            {books.map((book, index) => (
              <div className="book-grid" key={book.key || index}>
                <a href="">
                  <img
                    src={
                      book.cover_i
                        ? `https://covers.openlibrary.org/b/id/${books[index].cover_i}-M.jpg`
                        : "https://raw.githubusercontent.com/MrCheks/FilmSearch/756265bcd9696223d2193fa8c4cbd98a6e55040c/image-missing.svg"
                    }
                  />
                </a>
                {/* <p>{book.title}</p> */}
              </div>
            ))}
          </div>
          <a></a>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
