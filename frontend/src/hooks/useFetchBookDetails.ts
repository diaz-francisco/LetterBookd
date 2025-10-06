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
}
