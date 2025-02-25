import "./Banner.css";
import groupImage from "./../../assets/images/groupPng.png";

export default function Banner() {
  return (
    <div className="banner-container">
      <div className="main-banner">
        <div className="banner-words">
          <h1>Join a Club Today!</h1>
          <p>This is a test</p>
          <button>Join Today!</button>
        </div>
        <img src={groupImage} alt="group" />
      </div>
    </div>
  );
}
