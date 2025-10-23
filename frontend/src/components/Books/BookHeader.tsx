import React from "react";

interface BookHeaderProps {
  book: {
    title: string;
    authors?: Array<{ name: string }>;
    cover?: string | null;
  };
  subjects?: string[] | null;
}

const BookHeader: React.FC<BookHeaderProps> = ({ book, subjects }) => {
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
