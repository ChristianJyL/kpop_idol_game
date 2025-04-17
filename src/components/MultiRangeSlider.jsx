import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import "./css/MultiRangeSlider.css";

const MultiRangeSlider = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const rangeRef = useRef(null);

  // Fonction stable avec `useCallback` pour éviter le re-render infini
  const handleChange = useCallback(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  // Met à jour la position de la barre de sélection
  useEffect(() => {
    if (rangeRef.current) {
      const minPercent = ((minVal - min) / (max - min)) * 100;
      const maxPercent = ((maxVal - min) / (max - min)) * 100;
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, min, max]);

  // Appelle `handleChange` uniquement si les valeurs changent
  useEffect(() => {
    handleChange();
  }, [minVal, maxVal, handleChange]);

  return (
    <div className="container">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(e) => setMinVal(Math.min(Number(e.target.value), maxVal - 1))}
        className="thumb thumb--left"
      />

      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(e) => setMaxVal(Math.max(Number(e.target.value), minVal + 1))}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={rangeRef} className="slider__range" />
        <div className="slider__left-value">{minVal}</div>
        <div className="slider__right-value">{maxVal}</div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MultiRangeSlider;
