import React from "react";
import Navbar from "../Header.jsx";
import Footer from "../Footer.jsx";

export default function LoadingState() {
  return (
    <div>
      <Navbar />
      <div className="bodyApp">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
