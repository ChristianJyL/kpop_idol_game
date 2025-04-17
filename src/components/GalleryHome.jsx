import React, { useState } from 'react';
import './css/Gallery.css';
import Gallery  from './Gallery.jsx';
import idolsData from "../data_Idol.js";
import { TbReload } from "react-icons/tb";


export default function GalleryHome({listIdols}) {

    const getRandomIdols = () => {
        const randomIdols = idolsData.sort(() => Math.random() - Math.random()).slice(0, 3);
        return randomIdols;
    }

    const [randomIdols, setRandomIdols] = useState(getRandomIdols());

    return (
        <div className='gallery-container'>
        <h1>Gallery &nbsp; <TbReload onClick={() => setRandomIdols(getRandomIdols())} className="reload-icon" /></h1>
            <Gallery listIdols={randomIdols} />
        </div>)
}
