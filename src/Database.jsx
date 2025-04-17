import React, { useState, useMemo } from "react";
import IdolCard from "./components/IdolCard";
import NewsSlider from "./components/Slide.jsx";
import idolsData from "./data_Idol.js";
import Navbar from "./components/Navbar.jsx";
import Gallery from "./components/Gallery.jsx";
import GameMenu from "./components/GameMenu.jsx";
import Footer from "./components/Footer.jsx";
import MultiRangeSlider from "./components/MultiRangeSlider.jsx";
import "./app.css";

export default function Database() {
  const [search, setSearch] = useState("");
  const [idolsSortBy, setIdolsSortBy] = useState("name");
  const [idolsGeneration, setIdolsGeneration] = useState(["all"]);
  const [ageRange, setAgeRange] = useState({ min: 0, max: 100 });

  // Calculer les âges minimum et maximum
  const minAge = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Math.min(...idolsData.map((idol) => currentYear - new Date(idol["Date of Birth"]).getFullYear()));
  }, [idolsData]);

  const maxAge = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Math.max(...idolsData.map((idol) => currentYear - new Date(idol["Date of Birth"]).getFullYear()));
  }, [idolsData]);

  const filteredIdols = useMemo(() => {
    let result = idolsData.filter((idol) =>
      idol["Stage Name"].toLowerCase().includes(search.toLowerCase()) ||
      idol["Group"].toLowerCase().includes(search.toLowerCase())
    );

    if (idolsGeneration.length > 0 && !idolsGeneration.includes("all")) {
      result = result.filter((idol) => {
        const debutYear = new Date(idol["Debut"]).getFullYear();
        return idolsGeneration.some((gen) => {
          if (gen === "1st") {
            return debutYear >= 1992 && debutYear <= 2003;
          } else if (gen === "2nd") {
            return debutYear > 2003 && debutYear <= 2012;
          } else if (gen === "3rd") {
            return debutYear > 2012 && debutYear <= 2019;
          } else if (gen === "4th") {
            return debutYear > 2019;
          }
          return false;
        });
      });
    }

    result = result.filter((idol) => {
      const age = new Date().getFullYear() - new Date(idol["Date of Birth"]).getFullYear();
      return age >= ageRange.min && age <= ageRange.max;
    });

    result = result.sort((a, b) => {
      if (idolsSortBy === "age") {
        const ageA = new Date().getFullYear() - new Date(a["Date of Birth"]).getFullYear();
        const ageB = new Date().getFullYear() - new Date(b["Date of Birth"]).getFullYear();
        return ageA - ageB;
      } else if (idolsSortBy === "origin") {
        return a["Country"]?.localeCompare(b["Country"]);
      } else if (idolsSortBy === "Group") {
        return a["Group"]?.localeCompare(b["Group"]);
      } else if (idolsSortBy === "Height") {
        const heightA = parseInt(a["Height"]);
        const heightB = parseInt(b["Height"]);
        return heightA - heightB;
      } else {
        return a["Stage Name"]?.localeCompare(b["Stage Name"]);
      }
    });

    return result;
  }, [idolsData, search, idolsSortBy, idolsGeneration, ageRange]);

  const handleGenerationClick = (gen) => {
    if (gen === "all") {
      // Si "all" est cliqué, sélectionnez uniquement "all"
      setIdolsGeneration(["all"]);
    } else {
      // Si une autre génération est cliquée
      setIdolsGeneration((prev) => {
        // Désélectionnez "all" si elle était sélectionnée
        const newGenerations = prev.filter((g) => g !== "all");

        // Ajoutez ou retirez la génération cliquée
        if (newGenerations.includes(gen)) {
          return newGenerations.filter((g) => g !== gen);
        } else {
          return [...newGenerations, gen];
        }
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bodyApp">
        <div id="gallery-options">
          <div className="filter-section search-section">
            <input
              type="text"
              placeholder="Search Idol"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
              onChange={(e) => setIdolsSortBy(e.target.value)}
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
                onChange={(range) => {
                  setAgeRange((prev) => {
                    if (prev.min !== range.min || prev.max !== range.max) {
                      return range;
                    }
                    return prev;
                  });
                }}
              />
            </div>
          </div>
        </div>

        <Gallery listIdols={filteredIdols} />
      </div>
      <Footer />
    </div>
  );
}
