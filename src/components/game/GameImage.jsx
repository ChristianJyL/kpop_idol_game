import React from "react";

const GameImage = ({ currentIdol, backgroundColor, message }) => {
  return (
    <div className="image-area" style={{ backgroundColor }}>
      <img src={currentIdol["Image Link"]} alt={currentIdol["Stage Name"]} />
      {message && <div className="message-container">{message}</div>}
    </div>
  );
};

export default GameImage;
