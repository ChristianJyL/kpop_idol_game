import React from "react";
import "../../css/GameMenu.css"; 
import { Link } from "react-router-dom";

/*This component is used to display the game menu. 
For now, it only contains one game: Who's that idol?
But it designed to be easily extensible for future games.
*/
const GameMenu = () => {
  const games = [
    { title: "Who's that idol ?", description: "Guess the idol from the picture!" }
  ];

  return (
    <div id="game-menu-container">
      <h1>Game</h1>
      {/* <div className="game-menu"> if many games, used this */}
        {games.map((game, index) => (
          <Link to="game" style={{ textDecoration: 'none' }}> {/*Needs to be adapt if many games */}
          <div key={index} className="game-card">
            <h3>{game.title}</h3>
            <p>{game.description}</p>
          </div>
          </Link>
        ))}
        </div>
    // </div>
  );
};

export default GameMenu;
