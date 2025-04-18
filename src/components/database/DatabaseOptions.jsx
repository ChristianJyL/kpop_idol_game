import React from "react";
import MultiRangeSlider from "./MultiRangeSlider.jsx";

export default function DatabaseOptions({
  search,
  idolsSortBy,
  idolsGeneration,
  ageRange,
  minAge,
  maxAge,
  onSearchChange,
  onSortByChange,
  onGenerationChange,
  onAgeRangeChange
}) {
  const handleGenerationClick = (gen) => {
    if (gen === "all") {
      onGenerationChange(["all"]);
    } else {
      const currentGenerations = idolsGeneration.filter((g) => g !== "all");
      
      if (currentGenerations.includes(gen)) {
        // If the generation is already selected, remove it from the selection
        const newGenerations = currentGenerations.filter((g) => g !== gen);
        // If no generations are left, select "all" by default
        onGenerationChange(newGenerations.length === 0 ? ["all"] : newGenerations);
      } else {
        // If the generation is not selected, add it to the current selection
        onGenerationChange([...currentGenerations, gen]);
      }
    }
  };

  return (
    <div id="gallery-options">
      <div className="filter-section search-section">
        <input
          type="text"
          placeholder="Search Idol"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-section generation-section">
        <label>Generation</label>
        <div className="button-group">
          {["all", "1st", "2nd", "3rd", "4th"].map((gen) => (
            <button
              key={gen}
              onClick={() => handleGenerationClick(gen)}
              className={
                (gen === "all" && idolsGeneration.includes("all")) ||
                  (gen !== "all" && idolsGeneration.includes(gen))
                  ? "active"
                  : ""
              }
            >
              {gen}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section sort-section">
        <label htmlFor="idol-sort">Sort by</label>
        <select
          id="idol-sort"
          value={idolsSortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="sort-select"
        >
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="Group">Group</option>
          <option value="origin">Origin</option>
          <option value="Height">Height</option>
        </select>
      </div>

      <div className="filter-section age-section">
        <label>Age</label>
        <div className="slider-container">
          <MultiRangeSlider
            min={minAge}
            max={maxAge}
            initialMin={ageRange.min}
            initialMax={ageRange.max}
            onChange={(newRange) => {
              // Check if the new range is different from the current one
              if (newRange.min !== ageRange.min || newRange.max !== ageRange.max) {
                onAgeRangeChange(newRange);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
