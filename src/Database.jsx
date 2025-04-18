import React, { useState, useEffect, useMemo, useRef } from "react";
import Navbar from "./components/commun/Header.jsx";
import Footer from "./components/commun/Footer.jsx";
import { getIdolsData } from "./services/api";
import DatabaseOptions from "./components/database/DatabaseOptions";
import DatabaseContent from "./components/database/DatabaseContent";
import LoadingState from "./components/database/LoadingState";
import ErrorState from "./components/database/ErrorState";

export default function Database() {
  const hasSetInitialAgeRange = useRef(false);
  
  const [idolsData, setIdolsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // localStorage 
  const [search, setSearch] = useState(() => localStorage.getItem("dbSearch") || "");
  const [idolsSortBy, setIdolsSortBy] = useState(() => localStorage.getItem("dbSortBy") || "name");
  const [idolsGeneration, setIdolsGeneration] = useState(() => {
    const saved = localStorage.getItem("dbGeneration");
    return saved ? JSON.parse(saved) : ["all"];
  });
  const [ageRange, setAgeRange] = useState(() => {
    const saved = localStorage.getItem("dbAgeRange");
    return saved ? JSON.parse(saved) : { min: 0, max: 100 };
  });

  //update localStorage when state changes
  useEffect(() => localStorage.setItem("dbSearch", search), [search]);
  useEffect(() => localStorage.setItem("dbSortBy", idolsSortBy), [idolsSortBy]);
  useEffect(() => localStorage.setItem("dbGeneration", JSON.stringify(idolsGeneration)), [idolsGeneration]);
  useEffect(() => localStorage.setItem("dbAgeRange", JSON.stringify(ageRange)), [ageRange]);

  //data loading
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getIdolsData();
        setIdolsData(data);
      } catch (err) {
        setError("Error in loading idols data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //calculate min and max age
  const minMaxAge = useMemo(() => {
    if (!idolsData || idolsData.length === 0) return { min: 0, max: 100 };

    const currentYear = new Date().getFullYear();
    const ages = idolsData.map(idol =>
      currentYear - new Date(idol["Date of Birth"]).getFullYear()
    );

    return {
      min: Math.min(...ages),
      max: Math.max(...ages)
    };
  }, [idolsData]);

  //Initialise age range if it is not set
  useEffect(() => {
    if (idolsData?.length > 0 && !hasSetInitialAgeRange.current) { //verification if it is not set to not have infinite loop
      if (ageRange.min === 0 && ageRange.max === 100) {
        hasSetInitialAgeRange.current = true;
        setAgeRange({ min: minMaxAge.min, max: minMaxAge.max });
      }
    }
  }, [minMaxAge, idolsData, ageRange.min, ageRange.max]);

  //Error and loading pages
  if (error) return <ErrorState message={error} />;
  if (loading) return <LoadingState />;

  return (
    <div>
      <Navbar />
      <div className="bodyApp">
        <DatabaseOptions
          search={search}
          idolsSortBy={idolsSortBy}
          idolsGeneration={idolsGeneration}
          ageRange={ageRange}
          minAge={minMaxAge.min}
          maxAge={minMaxAge.max}
          onSearchChange={setSearch}
          onSortByChange={setIdolsSortBy}
          onGenerationChange={setIdolsGeneration}
          onAgeRangeChange={setAgeRange}
        />

        <DatabaseContent
          idolsData={idolsData}
          search={search}
          idolsSortBy={idolsSortBy}
          idolsGeneration={idolsGeneration}
          ageRange={ageRange}
        />
      </div>
      <Footer />
    </div>
  );
}
