import { useState, useEffect } from "react";
import axios from "axios";
// import BookSubmission from "./components/BookSubmission";
// import Login from "./components/Login";
import LandingPage from "./components/LandingPage";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001")
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error(
          "There was an error fetching the data!",
          error
        );
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
      </header>
      <LandingPage />
      {/* <Login /> */}
      {/* <BookSubmission /> */}
    </div>
  );
}

export default App;
