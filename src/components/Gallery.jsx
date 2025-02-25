import React, { useState } from 'react';
import './css/Gallery.css';
import idolsData from "../data_Idol.js";
import { TbReload } from "react-icons/tb";


export default function Gallery() {


    const getRandomIdols = () => {
        const randomIdols = idolsData.sort(() => Math.random() - Math.random()).slice(0, 3);
        return randomIdols;
    }

    const [randomIdols, setRandomIdols] = useState(getRandomIdols());
    return (
        <div className='gallery-container'>
            <h1>Gallery &nbsp; <TbReload onClick={() => setRandomIdols(getRandomIdols())} className="reload-icon" /></h1>
            
            <div id="idol-gallery">
                {randomIdols.map((idol) => (
                    <div id="idol-card">
                        <img
                            id="idol-picture"
                            src={idol["Image Link"]}
                            alt="idol"
                        />
                        <div id="idol-description">
                            <h3>{idol["Stage Name"]}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/*<div id="idol-gallery">
      {idolsData.map((idol) => (
        <IdolCard 
        //"Stage Name": "J-Hope",
        name= {idol["Stage Name"]}
        image = {idol["Image Link"]}
        />
      ))}
      </div>*/