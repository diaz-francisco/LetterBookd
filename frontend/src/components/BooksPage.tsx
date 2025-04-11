import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const BooksPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "Naruto";
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook(page = 1, limit = 25) {
      setLoading(true);

      try {
        const res = await fetch(`https://openlibrary.org/search.json?q=${query}&page=${[page]}&limit=${limit}`);

        const data = await res.json();
        setBooks(data.docs);
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
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div>
          <h2>Results for: {query}</h2>
          <p>Found {books?.length} books</p>
          {/* This will show your loaded data works */}
          <button onClick={() => console.log(books)}>Log Books to Console</button>
          {/* <img src={`https://covers.openlibrary.org/b/id/${books[0].cover_i}-M.jpg`}></img> */}
        </div>
      )}
    </div>
  );
};

export default BooksPage;
