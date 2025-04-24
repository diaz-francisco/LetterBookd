import { useState, useEffect } from "react";

export function useFetchBook(query: string, page = 1, limit = 42) {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<[]>([]);

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);

      try {
        const res = await fetch(`https://openlibrary.org/search.json?q=${query}&page=${[page]}&limit=${limit}`);

        const data = await res.json();

        const filteredBooks = data.docs.filter(books => books.cover_i);

        setBooks(filteredBooks);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [query, limit, page]);

  return { books, loading };
}
