import { useState, useEffect } from "react";

interface BookDetails {
  id: string;
  title: string;
  authors?: Array<{ key: string; name: string }>;
  authorKey: string;
  cover: string | null;
  description?: string | { value: string };
  first_sentence?: { value: string };
  subjects?: string[];
  publish_date?: string;
  number_of_pages?: number;
}

export function useFetchBookDetails(bookId: string) {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<BookDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookId) return;

    async function fetchBookDetails() {
      setLoading(true);
      setError(null);

      try {
        const bookTitle = bookId.replace(/-/g, " ");
        const searchRes = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(bookTitle)}&limit=1`);

        if (!searchRes.ok) {
          throw new Error("Book search failed");
        }

        const bookData = await searchRes.json();

        if (!bookData.docs || bookData.docs.length === 0) {
          throw new Error("Book not found");
        }

        const bookDoc = bookData.docs[0];

        if (!bookDoc.key) {
          throw new Error("Book key not found");
        }

        const detailRes = await fetch(`https://openlibrary.org${bookDoc.key}.json`);

        if (!detailRes.ok) {
          throw new Error(`Book details not found`);
        }

        const detailData = await detailRes.json();
        setBook(detailData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch book details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBookDetails();
  }, [bookId]);
  return { book, loading, error };
}
