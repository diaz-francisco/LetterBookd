// import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
// import { Star, Heart, MessageCircle } from "lucide-react";

const BookActions: React.FC = () => {
  //   const [isLiked, setIsLiked] = useState(false);

  //   const toggleLiked = () => {
  //     setIsLiked(!isLiked);
  //   };

  const notify = () => toast("Wow so easy!");

  return (
    <div>
      <h1>test</h1>
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </div>
  );
};

export default BookActions;
