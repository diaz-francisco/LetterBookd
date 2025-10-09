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
const authorCache = new Map<string, string>(); // Cache for author names

export function useFetchBookDetails(bookId: string) {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<BookDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!bookId) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

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

        const authorsWithNames = await Promise.all(
          (detailData.authors || []).map(async (author: any) => {
            const authorKey = author.author?.key || author.key;

            // Check author cache first
            if (authorCache.has(authorKey)) {
              return {
                key: authorKey,
                name: authorCache.get(authorKey)!,
              };
            }

            try {
              const authorRes = await fetch(`https://openlibrary.org${authorKey}.json`, {
                signal: abortController.signal,
              });

              if (authorRes.ok) {
                const authorData = await authorRes.json();
                const authorName = authorData.name || "Unknown Author";

                authorCache.set(authorKey, authorName);

                return {
                  key: authorKey,
                  name: authorName,
                };
              }
            } catch (err) {
              console.warn(`Failed to fetch author ${authorKey}:`, err);
            }

            return {
              key: authorKey,
              name: "Unknown Author",
            };
          })
        );

        const processedBook: BookDetails = {
          ...detailData,
          id: bookId,
          cover: detailData.covers?.[0] ? `https://covers.openlibrary.org/b/id/${detailData.covers[0]}-L.jpg` : null,
          authors: authorsWithNames,
          number_of_pages: detailData.number_of_pages || null,
        };

        requestCache.set(bookId, Promise.resolve(processedBook));
        setBook(processedBook);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to fetch book details");
        console.error("Error details:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBookDetails();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [bookId]);

  return { book, loading, error };
}
