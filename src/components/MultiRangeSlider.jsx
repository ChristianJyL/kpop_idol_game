import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./css/MultiRangeSlider.css";

const MultiRangeSlider = ({ min, max, initialMin, initialMax, onChange }) => {
  // Initialiser avec les valeurs initiales ou par défaut
  const [minVal, setMinVal] = useState(initialMin !== undefined ? initialMin : min);
  const [maxVal, setMaxVal] = useState(initialMax !== undefined ? initialMax : max);
  const rangeRef = useRef(null);
  
  // Référence de suivi pour les valeurs précédentes
  const prevMinValRef = useRef(minVal);
  const prevMaxValRef = useRef(maxVal);
  
  // Référence pour éviter les mises à jour au premier rendu
  const isFirstRender = useRef(true);

  // Met à jour la position de la barre de sélection
  useEffect(() => {
    if (rangeRef.current) {
      const minPercent = ((minVal - min) / (max - min)) * 100;
      const maxPercent = ((maxVal - min) / (max - min)) * 100;
      
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, min, max]);

  // Effect pour notifier le parent uniquement lorsque les valeurs changent réellement
  useEffect(() => {
    // Ignorer le premier rendu
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    // Vérifier si les valeurs ont réellement changé
    if (minVal !== prevMinValRef.current || maxVal !== prevMaxValRef.current) {
      // Mettre à jour les références des valeurs précédentes
      prevMinValRef.current = minVal;
      prevMaxValRef.current = maxVal;
      
      // Notifier le parent seulement si les valeurs ont changé
      onChange({ min: minVal, max: maxVal });
    }
  }, [minVal, maxVal, onChange]);

  // Mettre à jour les valeurs si min/max changent et qu'aucune valeur initiale n'a été fournie
  useEffect(() => {
    // Ne pas déclencher de re-rendus inutiles si nous avons des valeurs initiales
    if (initialMin === undefined && initialMax === undefined) {
      const newMinVal = min;
      const newMaxVal = max;
      
      if (newMinVal !== minVal) setMinVal(newMinVal);
      if (newMaxVal !== maxVal) setMaxVal(newMaxVal);
    }
  }, [min, max]);

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
  initialMin: PropTypes.number,
  initialMax: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default MultiRangeSlider;