import IdolCard from "./components/IdolCard"
import NewsSlider from "./components/Slide.jsx"

import Navbar from "./components/Navbar.jsx";
import GalleryHome from "./components/GalleryHome.jsx"

import GameMenu from "./components/GameMenu.jsx";
import Footer from "./components/Footer.jsx";
import "./app.css";




export default function App(){
  return (
    <div>
      <Navbar/>

      <div className="bodyApp">
        <NewsSlider />

        <div className="column">
          <GalleryHome/>
          <GameMenu/>
        </div>
      </div>
      <Footer/>
      
      
    </div>);
}

/*<h1>Idol Center</h1>
      <div id="idol-gallery">
      {idolsData.map((idol) => (
        <IdolCard 
        //"Stage Name": "J-Hope",
        name= {idol["Stage Name"]}
        image = {idol["Image Link"]}
        />
      ))}
      </div>
*/