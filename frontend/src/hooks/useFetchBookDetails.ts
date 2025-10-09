import { useState, useEffect, useRef } from "react";

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
const requestCache = new Map<string, Promise<BookDetails>>();

export function useFetchBookDetails(bookId: string) {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<BookDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!bookId) return;

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Check cache first
    if (requestCache.has(bookId)) {
      requestCache.get(bookId)!.then(setBook).catch(setError);
      return;
    }

    async function fetchBookDetails() {
      setLoading(true);
      setError(null);

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        let apiBookId;
        if (bookId.startsWith("works/")) {
          apiBookId = `/${bookId}`;
        } else if (bookId.startsWith("/works/")) {
          apiBookId = bookId;
        } else {
          apiBookId = `/works/${bookId}`;
        }

        const apiUrl = `https://openlibrary.org${apiBookId}.json`;

        const detailRes = await fetch(apiUrl, {
          signal: abortController.signal,
        });

        if (!detailRes.ok) {
          throw new Error(`Book details not found: ${detailRes.status}`);
        }

        const detailData = await detailRes.json();

        const processedBook: BookDetails = {
          ...detailData,
          id: bookId,
          cover: detailData.covers?.[0] ? `https://covers.openlibrary.org/b/id/${detailData.covers[0]}-L.jpg` : null,
        };

        // Cache the result
        requestCache.set(bookId, Promise.resolve(processedBook));
        setBook(processedBook);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return; // Request was cancelled
        }
        setError(err instanceof Error ? err.message : "Failed to fetch book details");
        console.error("Error details:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBookDetails();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [bookId]);

  return { book, loading, error };
}
