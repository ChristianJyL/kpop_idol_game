import IdolCard from "./components/commun/IdolCard.jsx"
import NewsSlider from "./components/home/Slide.jsx"

import Header from "./components/commun/Header.jsx";
import GalleryHome from "./components/home/GalleryHome.jsx"

import GameMenu from "./components/home/GameMenu.jsx";
import Footer from "./components/commun/Footer.jsx";


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
