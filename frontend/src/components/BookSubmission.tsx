// import React, { useState } from "react";

const BookSubmission: React.FC = () => {
  //   const [count, setCount] = useState(0);

  //   const handleClick = () => {
  //     setCount(count + 1);
  //   };

  return (
    <div>
      <form
        action=""
        method="get"
        className="form-example"
      >
        <div className="form-example">
          <label htmlFor="name">
            Enter your name:{" "}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
          />
        </div>
      </form>
    </div>
  );
};
export default BookSubmission;
