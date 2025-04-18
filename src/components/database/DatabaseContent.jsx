import React, { useMemo } from "react";
import Gallery from "../Gallery.jsx";

export default function DatabaseContent({ 
  idolsData,
  search,
  idolsSortBy,
  idolsGeneration,
  ageRange
}) {
  const filteredIdols = useMemo(() => {
    if (!idolsData || idolsData.length === 0) return [];

    // Filter idols based on search term
    let result = idolsData.filter((idol) => 
      idol["Stage Name"].toLowerCase().includes(search.toLowerCase()) ||
      idol["Group"].toLowerCase().includes(search.toLowerCase())
    );

    // Filter idols based on generation
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

    // Filter idols based on age range
    result = result.filter((idol) => {
      const age = new Date().getFullYear() - new Date(idol["Date of Birth"]).getFullYear();
      return age >= ageRange.min && age <= ageRange.max;
    });

    // Sort idols based on selected criteria
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

  // If no idols match the filters, show a message
  if (filteredIdols.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">🔍</div>
        <h2>No results found</h2>
        <p>Try modifying your filters or search</p>
      </div>
    );
  }

  // Render the filtered idols in a gallery
  return <Gallery listIdols={filteredIdols} />;
}
