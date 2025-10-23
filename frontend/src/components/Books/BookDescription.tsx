import React from "react";

interface BookDescriptionProps {
  description: string;
  showMore: boolean;
  setShowMore: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const BookDescription: React.FC<BookDescriptionProps> = ({ description, showMore, setShowMore }) => {
  const truncDescription = description.length ? description.slice(0, 240) : description;

  return (
    <div className="book-description">
      <div
        className={`description-text ${showMore ? "expanded" : "collapsed"}`}
        role="button"
        tabIndex={0}
        aria-expanded={showMore}
        onClick={() => setShowMore(v => !v)}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setShowMore(v => !v);
          }
        }}
      >
        {showMore ? description : truncDescription}
      </div>
    </div>
  );
};

export default BookDescription;
