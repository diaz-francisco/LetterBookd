import "./Banner.css";
import groupImage from "./../../assets/images/groupPng.png";

export default function Banner() {
  return (
    <div className="banner-container">
      <div className="main-banner">
        <div className="banner-words">
          <h1>Join a Club Today!</h1>
          <p>
            Be a part of something bigger than
            just reading.
          </p>
          <button>Join Today!</button>
        </div>
        <picture>
          <source media="(max-width: 600px)" />
          <img src={groupImage} alt="Group" />
        </picture>
      </div>
    </div>
  );
}
