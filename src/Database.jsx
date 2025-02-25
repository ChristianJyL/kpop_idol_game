import IdolCard from "./components/IdolCard"
import NewsSlider from "./components/Slide.jsx"
import idolsData from "./data_Idol.js";
import Navbar from "./components/Navbar.jsx";
import Gallery from "./components/Gallery.jsx";
import GameMenu from "./components/GameMenu.jsx";
import Footer from "./components/Footer.jsx";
import { useState, useMemo } from "react";

import "./app.css";

export default function Database(){
  const [search, setSearch] = useState("");
  const [idolsSortBy, setIdolsSortBy] = useState("name");
  const [idolsGeneration, setIdolsGeneration] = useState("all");


  const filteredIdols = useMemo(() => {
    let result = idolsData.filter((idol) =>
      idol["Stage Name"].toLowerCase().includes(search.toLowerCase())
    );

    if (idolsGeneration !== "all") {
      result = result.filter((idol) => {
      const debutYear = new Date(idol["Debut"]).getFullYear();
      if (idolsGeneration === "1st") {
        return debutYear >= 1992 && debutYear <= 2003;
      } else if (idolsGeneration === "2nd") {
        return debutYear > 2003 && debutYear <= 2012;
      } else if (idolsGeneration === "3rd") {
        return debutYear > 2012 && debutYear <= 2019;
      } else if (idolsGeneration === "4th") {
        return debutYear > 2019;
      }
      return false;
      });
    }

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
  }, [idolsData, search, idolsSortBy, idolsGeneration]);
  


  return (
    <div>
      <Navbar/>
      <div className="bodyApp">

      <div id="gallery-options">
        <input
          type="text"
          placeholder="Search Idol"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <label htmlFor="generation">Génération </label>
        <select
          id="generation"
          value={idolsGeneration}
          onChange={(e) => setIdolsGeneration(e.target.value)}
        >
          <option value="all">All</option>
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
          <option value="3rd">3rd</option>
          <option value="4th">4th</option>
        </select>
        
        <label htmlFor="Idol-sort">Sort by : </label>
        <select
          id="idol-sort"
          value={idolsSortBy}
          onChange={(e) => setIdolsSortBy(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="Group">Group</option>
          <option value="origin">Origin</option>
          <option value="Height">Height</option>

        </select>
      </div>

      <div id="idol-gallery">
      {filteredIdols.map((idol) => (
        <IdolCard 
          name={idol["Stage Name"]}
          groupName={idol["Group"]}
          birthDate={idol["Date of Birth"]}
          height={idol["Height"]}
          origin={idol["Country"]}
          image={idol["Image Link"]}
        />
      ))}
      </div>

      </div>
      <Footer/>
    </div>
  );
}