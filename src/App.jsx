import IdolCard from "./components/IdolCard"
import NewsSlider from "./components/Slide.jsx"

import Header from "./components/Header.jsx";
import GalleryHome from "./components/GalleryHome.jsx"

import GameMenu from "./components/GameMenu.jsx";
import Footer from "./components/Footer.jsx";
import "./app.css";


export default function App() {
  return (
    <div>
      <Header />
      <div className="bodyApp">
        <NewsSlider />
        <div className="column">
          <GalleryHome />
          <GameMenu />
        </div>
      </div>
      <Footer />
      
    </div>);
}
