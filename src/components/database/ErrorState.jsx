
import React from "react";
import Navbar from "../Header.jsx";
import Footer from "../Footer.jsx";

export default function ErrorState({message}) {
  return (
    <div>
      <Navbar />
      <div className="bodyApp">
        
        <div className="no-results">
        <div className="no-results-icon">🚧💥🤯</div>
          <h2>Ooups, there is an error here !</h2>
          <p>{message}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
