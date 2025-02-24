import { useState } from "react";
import newsData from "../data_news.js";
import "./slide.css";

export default function NewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const selectNext = () => {
    if (currentIndex < newsData.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (

    <div className="card">
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