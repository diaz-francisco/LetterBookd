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
        let apiBookId;
        if (bookId.startsWith("works/")) {
          apiBookId = `/${bookId}`;
        } else if (bookId.startsWith("/works/")) {
          apiBookId = bookId;
        } else {
          // Just the OLID, add /works/ prefix
          apiBookId = `/works/${bookId}`;
        }

        const apiUrl = `https://openlibrary.org${apiBookId}.json`;

        const detailRes = await fetch(apiUrl);
        console.log("Response status:", detailRes.status);

        if (!detailRes.ok) {
          throw new Error(`Book details not found: ${detailRes.status}`);
        }

        const detailData = await detailRes.json();
        console.log("API Response:", detailData);

        const processedBook: BookDetails = {
          ...detailData,
          id: bookId,
          cover: detailData.covers?.[0] ? `https://covers.openlibrary.org/b/id/${detailData.covers[0]}-L.jpg` : null,
        };

        setBook(processedBook);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch book details");
        console.error("Error details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBookDetails();
  }, [bookId]);
  return { book, loading, error };
}
