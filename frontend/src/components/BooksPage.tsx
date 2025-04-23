import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "../components/LandingPage/BooksPage.css";

const BooksPage: React.FC = () => {
  const [searchedFor, setSearchedFor] = useState("");
  const [err, setErr] = useState("");

  const [searchParams] = useSearchParams();
  const query = searchParams.get("Naruto") || "House of lEaves";
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook(page = 1, limit = 42) {
      setLoading(true);

      try {
        const res = await fetch(`https://openlibrary.org/search.json?q=${query}&page=${[page]}&limit=${limit}`);

        const data = await res.json();

        const filteredDocs = data.docs.filter(book => book.cover_i);

        setBooks(filteredDocs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [query]);

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
