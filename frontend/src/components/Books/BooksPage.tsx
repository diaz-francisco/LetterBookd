import React from "react";
import { useSearchParams } from "react-router-dom";
import "./styles/BooksPage.css";
import { useFetchBook } from "../../hooks/useFetchBook";
import SearchBar from "./SearchBar";
import BookList from "./BookList";

const BooksPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "Lost";
  const { books, loading } = useFetchBook(query);

  const handleSearch = (newQuery: string) => {
    setSearchParams({ query: newQuery });
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div>
        <h2>Results for: {query}</h2>
        <p>Found {books?.length} books</p>
        <BookList books={books} loading={loading} />
      </div>
    </div>
  );
};

export default BooksPage;
