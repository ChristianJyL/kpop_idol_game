import React from "react";

//the buttons to choose the idols
const GameOptions = ({ options, currentIdol, message, currentChoice, onChoiceClick }) => {
  return (
    <div className="options">
      {options.map((option) => (
        <button
          className="option" key={option.id} onClick={() => onChoiceClick(option)}
          style={{
            background: message ? //is there a message ?
            option.id === currentIdol.id //is the option the correct one ?
                ? "green" : "red" //if yes, green, if no, red
              : "var(--primary-color)", //if no message, primary color
            display: message? //is there a message ?
            (option.id === currentIdol.id || options.findIndex(o => o.id === option.id) === options.findIndex(o => o.id === currentChoice?.id)) //to show the correct answer and the current choice
                ? "inline-block" : "none" //if yes, show it, if no, hide it
              : "inline-block" //if no message, show it
          }}
          disabled={!!message}
        >
          {option["Stage Name"]}
        </button>
      ))}
    </div>
  );
};

export default GameOptions;
