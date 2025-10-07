import { useState, useEffect } from "react";

interface BookDetails {
  id: string;
  title: string;
  author: string;
  authorKey: string;
  cover: string | null;
  description?: string;
  firstSentence?: string;
  subject?: string;
}

interface BookDetailsState {
  book: BookDetails | null;
  loading: boolean;
  error: string | null;
}

export function useFetchBookDetails(bookId: string) {
  const [loading, setLoading] = useState(false);
  const [book, setBooks] = useState<BookDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookId) return;

    async function useFetchBookDetails() {
      setLoading(true);
      setError(null);

      const bookRes = await fetch(`https://openlibrary.org/works/${bookId}.json`);

      if (!bookRes.ok) {
        throw new Error(`Book not found: ${bookRes.status}`);
      }

      const bookData = await bookRes.json();

      let authorName = "Unknown Author";
    }
  });
}
