import { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import newsData from "../data_news.js";
import "./css/Slide.css";

export default function NewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? newsData.length - 1 : prevIndex - 1));
  };

  const selectNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === newsData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="card">
    <BsArrowLeftCircleFill onClick={selectPrevious} className="arrow arrow-left" />

      <div className="card-content">
        <h2>{newsData[currentIndex].title}</h2>
        <p>{newsData[currentIndex].content}</p>

        <div className="indicators">
          {newsData.map((_, idx) => (
            <button
              key={idx}
              className={currentIndex === idx ? "indicator" : "indicator indicator-inactive"}
              onClick={() => setCurrentIndex(idx)}
            ></button>
          ))}
        </div>
        
      </div>
      <div className="card-image">
        <img src={newsData[currentIndex].pictureUrl} alt={newsData[currentIndex].title} />
      </div>
    <BsArrowRightCircleFill onClick={selectNext} className="arrow arrow-right" />
    </div>

  );
}

/*<div>
        <button onClick={selectPrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        <button
          onClick={selectNext}
          disabled={currentIndex === newsData.length - 1}
        >
          Next
        </button>
      </div>*/