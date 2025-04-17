import React, { useState } from 'react';
import './css/Gallery.css';
import idolsData from "../data_Idol.js";
import IdolCard from "./IdolCard.jsx";
import { TbReload } from "react-icons/tb";


export default function Gallery({listIdols}) {

    return (
            <div id="idol-gallery">
                {listIdols.map((idol) => (
                    <IdolCard 
                              key={idol["Stage Name"]}
                              name={idol["Stage Name"]}
                              groupName={idol["Group"]}
                              birthDate={idol["Date of Birth"]}
                              height={idol["Height"]}
                              origin={idol["Country"]}
                              image={idol["Image Link"]}
                            />
                ))} 
            </div>)
}


/*
 <div className='gallery-container'>
            <h1>Gallery &nbsp; <TbReload onClick={() => setRandomIdols(getRandomIdols())} className="reload-icon" /></h1>
            



    const getRandomIdols = () => {
        const randomIdols = idolsData.sort(() => Math.random() - Math.random()).slice(0, 3);
        return randomIdols;
    }

    const [randomIdols, setRandomIdols] = useState(getRandomIdols());

    */