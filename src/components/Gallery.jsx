import React, { useState } from 'react';
import './css/Gallery.css';
import idolsData from "../data_Idol.js";
import IdolCard from "./IdolCard.jsx";
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