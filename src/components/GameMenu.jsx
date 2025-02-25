import React from "react";
import "./css/GameMenu.css"; // Import du fichier CSS

const GameMenu = () => {
  const games = [
    { title: "Who's that idol ?", description: "a description of the game" },
    { title: "Guess that idol", description: "a description of the game" },
    { title: "Guess the name", description: "a description of the game" },
    { title: "Guess the picture", description: "a description of the game" },
  ];

  return (
    <div id="game-menu-container">
      <h1>Games</h1>
      <div className="game-menu">
        {games.map((game, index) => (
          <div key={index} className="game-card">
            <h3>{game.title}</h3>
            <p>{game.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameMenu;
