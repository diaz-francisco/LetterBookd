import React from "react";
import { useFetchBook } from "../../hooks/useFetchBook";
import "./styles/Banner.css";

interface Book {
  key: string;
  cover_i?: number;
  title?: string;
}

const Banner: React.FC = () => {
  const { books, loading } = useFetchBook("Comic");
  const frontDisplay = (books as Book[]).slice(0, 8);

  return (
    <div className="banner">
      {loading ? (
        <p className="loading">Fetching books...</p>
      ) : (
        <div className="banner-content">
          <div className="frontpage">
            {frontDisplay.map((book, i) => (
              <div key={book.key || i} className="banner-book">
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
