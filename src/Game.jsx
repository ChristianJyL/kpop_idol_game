import IdolCard from "./components/IdolCard.jsx"
import NewsSlider from "./components/Slide.jsx"
import idolsData from "./data_Idol.js";
import Navbar from "./components/Navbar.jsx";
import Gallery from "./components/Gallery.jsx";
import GameMenu from "./components/GameMenu.jsx";
import Footer from "./components/Footer.jsx";
import "./app.css";




export default function Game(){
  return (
    <div>
      <Navbar/>

      <div className="bodyApp">
        <NewsSlider />

       
      </div>
      <Footer/>
      
      
    </div>);
}
