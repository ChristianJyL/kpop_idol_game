import React, { useState, useEffect } from "react";
import IdolCard from "./components/IdolCard.jsx";
import NewsSlider from "./components/Slide.jsx";
import idolsData from "./data_Idol.js";
import Navbar from "./components/Navbar.jsx";
import Gallery from "./components/Gallery.jsx";
import GameMenu from "./components/GameMenu.jsx";
import Footer from "./components/Footer.jsx";
import "./app.css";
import "./game.css";

export default function Game() {
  const [currentIdol, setCurrentIdol] = useState(null);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    const randomIdol = idolsData[Math.floor(Math.random() * idolsData.length)];
    const uniqueOptions = new Set([randomIdol]);
    while (uniqueOptions.size < 4) {
      uniqueOptions.add(idolsData[Math.floor(Math.random() * idolsData.length)]);
    }
    setCurrentIdol(randomIdol);
    setOptions(shuffle([...uniqueOptions]));
    setMessage("");
    setBackgroundColor("");
  };

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleChoiceClick = (choice) => {
    if (choice.id === currentIdol.id) {
      setMessage("Correct!");
      setBackgroundColor("green");
    } else {
      setMessage("Incorrect.");
      setBackgroundColor("red");
    }
    setTimeout(generateNewQuestion, 2000);
  };

  return (
    <div>
      <Navbar />
      <div className="main">
        {currentIdol && currentIdol["Image Link"] && (
          <div className="game-area">
            <div className="image-area" style={{ backgroundColor }}>
              <img src={currentIdol["Image Link"]} alt={currentIdol["Stage Name"]} />
            </div>
            <div className="options">
              {options.map((option) => (
                <button
                  className="option"
                  key={option.id}
                  onClick={() => handleChoiceClick(option)}
                  style={{
                    background: message
                      ? "green"
                      : "var(--primary-color);",
                    display: message ? (option.id === currentIdol.id ? "inline-block" : "none") : "inline-block"
                  }}
                >
                  {option["Stage Name"]}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="stats">
          <p>❤️ ❤️ ❤️</p>
          <p>Score: </p>
          <p>Streak: </p>
          <p>Max Streak: </p>
          <p>Guess Time: </p>
          <button
            className="reset-btn"
            onClick={generateNewQuestion}
          >
            RESET
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}