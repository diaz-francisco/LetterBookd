import React, { useState, TouchEvent, useEffect } from "react";
import { useFetchBook } from "../../hooks/useFetchBook";
import "./styles/Banner.css";

interface Book {
  key: string;
  cover_i?: number;
  title?: string;
}

const searchTerms = [
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Romance",
  "Horror",
  "Classic Literature",
  "Contemporary",
  "Biography",
  "History",
  "Poetry",
  "Comic",
  "Graphic Novel",
  "Young Adult",
  "Children's Books",
  "Philosophy",
];

const Banner: React.FC = () => {
  const [randomTerm, setRandomTerm] = useState("");
  const { books, loading } = useFetchBook(randomTerm);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const frontDisplay = (books as Book[]).slice(0, 8);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * searchTerms.length);
    setRandomTerm(searchTerms[randomIndex]);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % frontDisplay.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? frontDisplay.length - 1 : prevIndex - 1));
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="banner">
      {loading ? (
        <p className="loading">Fetching books...</p>
      ) : (
        <div className="banner-content">
          <button className="carousel-button prev" onClick={prevSlide}>
            &#10094;
          </button>
          <div
            className="carousel-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {frontDisplay.map((book, i) => (
                <div key={book.key || i} className="carousel-slide">
                  <a href={`/books/${book.key}`}>
                    <img
                      src={
                        book.cover_i
                          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                          : "https://raw.githubusercontent.com/MrCheks/FilmSearch/756265bcd9696223d2193fa8c4cbd98a6e55040c/image-missing.svg"
                      }
                      alt={book.title || "Book cover"}
                    />
                    <div className="book-title">{book.title}</div>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <button className="carousel-button next" onClick={nextSlide}>
            &#10095;
          </button>
          <div className="carousel-dots">
            {frontDisplay.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
