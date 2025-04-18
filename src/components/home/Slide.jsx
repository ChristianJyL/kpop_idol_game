import { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { getNewsData } from "../../services/api";
import "../../css/Slide.css";

export default function NewsSlider() {
    const [newsData, setNewsData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        getNewsData()
            .then(data => setNewsData(data))
            .catch(err => console.error("Erreur:", err));
    }, []);

    const selectPrevious = () => {
        if (newsData.length === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? newsData.length - 1 : prevIndex - 1));
    };

    const selectNext = () => {
        if (newsData.length === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex === newsData.length - 1 ? 0 : prevIndex + 1));
    };

    if (!newsData || newsData.length === 0) {
        return <div className="card">Loading...</div>;
    }

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