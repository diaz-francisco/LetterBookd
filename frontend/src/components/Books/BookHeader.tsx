import React, { useEffect, useState } from "react";
import { getBookRatingStats } from "../../services/likes";
import StarRating from "./StarRating";
import "./styles/BookdDetails.css"; // or your header styles

interface BookHeaderProps {
  book: {
    title: string;
    authors?: Array<{ name: string }>;
    cover?: string | null;
  };
  subjects?: string[] | null;
  bookId?: string; // Add bookId prop
}

const BookHeader: React.FC<BookHeaderProps> = ({ book, subjects, bookId }) => {
  const [stats, setStats] = useState<{ averageRating: number | null; ratingsCount: number } | null>(null);

  useEffect(() => {
    if (!bookId) return;

    const fetchStats = async () => {
      try {
        const data = await getBookRatingStats(bookId);
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch rating stats:", err);
      }
    };

    fetchStats();
  }, [bookId]);

  return (
    <>
      {book.cover && <img className="bookImg" src={book.cover} alt={book.title} />}

      <div className="detail-content">
        <h1>{book.title}</h1>
        {book.authors && (
          <div className="authors-line">
            <span>{book.authors.map(a => a.name).join(", ")}</span>
          </div>
        )}

        {/* Average Rating Display */}
        {stats && stats.ratingsCount > 0 && (
          <div className="book-rating-display">
            <StarRating value={stats.averageRating || 0} readOnly size="small" />
            <span className="rating-text">
              {stats.averageRating?.toFixed(1)} ({stats.ratingsCount} {stats.ratingsCount === 1 ? "rating" : "ratings"})
            </span>
          </div>
        )}

        {subjects && (
          <ul className="lists">
            {subjects.map((subject, index) => (
              <li key={index} className="chips">
                {subject}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default BookHeader;
