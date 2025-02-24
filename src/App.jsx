import IdolCard from "./components/IdolCard"
import NewsSlider from "./components/slide"
import idolsData from "./data_Idol.js";
import Navbar from "./components/navbar.jsx";
import "./app.css";




export default function App(){
  return (
    <div>
      <Navbar/>

      <div className="body">

      <NewsSlider />
     


      

      </div>
      
      
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