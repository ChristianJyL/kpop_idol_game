import React from "react";

//the stats of the game
const GameStats = ({
  lives,
  score,
  bestScore,
  streak,
  maxStreak,
  timer,
  guessTime,
  isGameActive,
  onReset
}) => {
  return (
    <div className="stats">
      <div className="stat-item">
        <span className="stat-label">Lives: </span>
        <span className="stat-value">
          {Array.from({ length: lives }).map((_, i) => (
            <span key={i} role="img" aria-label="heart">❤️</span>
          ))}
          {Array.from({ length: 3 - lives }).map((_, i) => (
            <span key={i} role="img" aria-label="empty-heart" style={{ opacity: 0.3 }}>🖤</span>
          ))}
        </span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Score: </span>
        <span className="stat-value">{score}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Best Score: </span>
        <span className="stat-value">{bestScore} 🌟</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Current Streak: </span>
        <span className="stat-value">{streak} 🔥</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Best Streak: </span>
        <span className="stat-value">{maxStreak} 🏆</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Time Left: </span>
        <span className="stat-value">{timer}s ⏱️</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Response Time: </span>
        <span className="stat-value">{guessTime}s ⏱️</span>
      </div>
      {!isGameActive ? (
        <button className="reset-btn" onClick={onReset}>
          PLAY AGAIN
        </button>
      ) : (
        <button className="reset-btn" onClick={onReset}>
          RESET
        </button>
      )}
    </div>
  );
};

export default GameStats;
