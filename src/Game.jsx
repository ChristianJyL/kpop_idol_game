import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { getIdolsData } from "./services/api";
import GameStats from "./components/game/GameStats.jsx";
import GameOptions from "./components/game/GameOptions.jsx";
import GameImage from "./components/game/GameImage.jsx";
import ErrorState from "./components/database/ErrorState.jsx";
import "./app.css";
import "./game.css";

export default function Game() {
  //Game data
  const [idolsData, setIdolsData] = useState([]);
  const [currentIdol, setCurrentIdol] = useState(null);
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(null);
  
  //UI 
  const [message, setMessage] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [currentChoice, setCurrentChoice] = useState(null);
  const [isGameActive, setIsGameActive] = useState(true);
  
  // Scores and stats
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    Number(localStorage.getItem("bestScore") || "0")
  );
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(
    Number(localStorage.getItem("maxStreak") || "0")
  );
  
  // Timer
  const [timer, setTimer] = useState(10);
  const [guessTime, setGuessTime] = useState(0);
  const timerRef = useRef(null);

  //an utility function to shuffle the options
  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  //Data initialization
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getIdolsData();
        setIdolsData(data);
        generateNewQuestion(data);
      } catch (err) {
        setError("Error in data loading: " + err.message);
        console.error(err);
      }
    };
    fetchData();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  //Storage save
  useEffect(() => {
    localStorage.setItem("maxStreak", maxStreak.toString());
  }, [maxStreak]);

  useEffect(() => {
    localStorage.setItem("bestScore", bestScore.toString());
  }, [bestScore]);

  //Timer logic 
  useEffect(() => {
    if (currentIdol && isGameActive) {
      setTimer(10);
      setGuessTime(0);

      const startTime = Date.now();

      // Start the timer
      timerRef.current = setInterval(() => { 
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        setGuessTime(elapsedTime);

        // Update the timer every second
        setTimer(prev => {
          if (prev <= 0) {
            clearInterval(timerRef.current);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Cleanup function to clear the timer when the component unmounts or when currentIdol changes
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [currentIdol]);

  
  const generateNewQuestion = (data = idolsData) => {
    // If no data is available, return early
    if (!data || data.length === 0) return;

    // Clear the timer if it exists
    if (timerRef.current) clearInterval(timerRef.current);

    //get a random idol 
    const randomIdol = data[Math.floor(Math.random() * data.length)];

    //get 3 random idols and add the current one to the options
    const uniqueOptions = new Set([randomIdol]);
    while (uniqueOptions.size < 4 && uniqueOptions.size < data.length) {
      uniqueOptions.add(data[Math.floor(Math.random() * data.length)]);
    }
    setCurrentIdol(randomIdol);
    setOptions(shuffle([...uniqueOptions]));
    setMessage("");
    setBackgroundColor("");
    setCurrentChoice(null);
  };

  const handleTimeUp = () => {
    // Clear the timer
    if (timerRef.current) clearInterval(timerRef.current);

    setMessage("Time's up! It was " + currentIdol["Stage Name"]);
    setBackgroundColor("red");
    setLives(prev => prev - 1);
    setStreak(0);

    if (lives <= 1) {
      setIsGameActive(false);
      setMessage("Game Over!");
    } else {
      setTimeout(() => generateNewQuestion(), 2000);
    }
  };

  const handleChoiceClick = (choice) => {
    if (timerRef.current) clearInterval(timerRef.current);

    setCurrentChoice(choice);

    const isCorrect = choice.id === currentIdol.id;
    
    if (isCorrect) {
      setMessage("Correct!");
      setBackgroundColor("green");
      const newScore = score + 100 + timer * 20; // 100 points for correct answer + 20 points for each second left
      setScore(newScore);
      setBestScore(prev => Math.max(prev, newScore));
      setStreak(prev => prev + 1);
      setMaxStreak(prev => Math.max(prev, streak + 1));
    } else {
      setMessage("Incorrect. It was " + currentIdol["Stage Name"]);
      setBackgroundColor("red");
      setLives(prev => prev - 1);
      setStreak(0);
    }

    if (lives <= 1 && !isCorrect) {
      setIsGameActive(false);
      setMessage("Game Over!");
    } else {
      setTimeout(() => generateNewQuestion(), 2000);
    }
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setStreak(0);
    setIsGameActive(true);
    generateNewQuestion();
  };

  // Rendu
  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div>
      <Navbar />
      <div className="main">
        {currentIdol && currentIdol["Image Link"] && (
          <div className="game-area">
            <GameImage 
              currentIdol={currentIdol} 
              backgroundColor={backgroundColor}
              message={message}
            />

            {isGameActive && (
              <GameOptions
                options={options}
                currentIdol={currentIdol}
                message={message}
                currentChoice={currentChoice}
                onChoiceClick={handleChoiceClick}
              />
            )}
          </div>
        )}
        <GameStats
          lives={lives}
          score={score}
          bestScore={bestScore}
          streak={streak}
          maxStreak={maxStreak}
          timer={timer}
          guessTime={guessTime}
          isGameActive={isGameActive}
          onReset={resetGame}
        />
      </div>
      <Footer />
    </div>
  );
}