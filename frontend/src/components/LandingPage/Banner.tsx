import "./Banner.css";
import { useSearchParams } from "react-router-dom";
import { useFetchBook } from "../../hooks/useFetchBook";

const Banner: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "City of Ember";

  const { books, loading } = useFetchBook("2");
  const frontDisplay = books.slice(0, 1);

  return (
    <div>
      <div>
        {loading ? (
          <p>Fetching books...</p>
        ) : (
          <div>
            <h2>Results for: {query}</h2>
            <p>Found {frontDisplay?.length} frontDisplay</p>
            {/* <button onClick={() => console.log(frontDisplay)}>Log Books to Console</button> */}
            <div>
              {frontDisplay.map((book, index) => (
                <div key={book.key || index}>
                  <a href="">
                    <img src={`https://covers.openlibrary.org/b/id/${frontDisplay[index].cover_i}-M.jpg`} />
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
