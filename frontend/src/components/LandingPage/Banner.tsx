import "./Banner.css";

import { useFetchBook } from "../../hooks/useFetchBook";

const Banner: React.FC = () => {
  const { books, loading } = useFetchBook("Popular");
  const frontDisplay = books.slice(0, 8);

  return (
    <div>
      <div>
        {loading ? (
          <p style={{ display: "flex" }}>Fetching books...</p>
        ) : (
          <div>
            {/* <button onClick={() => console.log(frontDisplay)}>Log Books to Console</button> */}
            <div className="frontpage">
              {frontDisplay.map((book, i) => (
                <div key={book.key || index}>
                  <a>
                    <img src={`https://covers.openlibrary.org/b/id/${frontDisplay[i].cover_i}-M.jpg`} />
                  </a>
                  {/* <p>{book.title}</p> */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
