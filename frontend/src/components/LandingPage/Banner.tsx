import "./Banner.css";
import { useSearchParams } from "react-router-dom";
import { useFetchBook } from "../../hooks/useFetchBook";

const Banner: React.FC = () => {
  const [searchParams] = useSearchParams();

  const { books, loading } = useFetchBook("House of Leaves");
  const frontDisplay = books.slice(0, 4);

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
            <a></a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
