import React, { useState, useEffect } from 'react';
import './css/Gallery.css';
import Gallery from './Gallery.jsx';
import { getIdolsData } from "../services/api";
import { TbReload } from "react-icons/tb";

export default function GalleryHome() {
    const [idolsData, setIdolsData] = useState([]);
    const [randomIdols, setRandomIdols] = useState([]);

    useEffect(() => {
        getIdolsData()
            .then(data => {
                setIdolsData(data);
                setRandomIdols(getRandomIdols(data));
            })
            .catch(err => console.error("Erreur:", err));
    }, []);

    const getRandomIdols = (data) => {
        if (!data || data.length === 0) return [];
        return [...data].sort(() => Math.random() - Math.random()).slice(0, 3);
    }

    return (
        <div className='gallery-container'>
            <h1>Gallery &nbsp;
                <TbReload
                    onClick={() => setRandomIdols(getRandomIdols(idolsData))}
                    className="reload-icon"
                />
            </h1>
            <Gallery listIdols={randomIdols} />
        </div>
    );
}
