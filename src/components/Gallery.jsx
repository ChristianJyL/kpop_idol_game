import React, { useState } from 'react';
import './css/Gallery.css';
import IdolCard from "./IdolCard.jsx";


export default function Gallery({ listIdols }) {

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