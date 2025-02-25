import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Database from "../Database.jsx";
import Game from "../Game.jsx";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/database",
    element: <Database />,
  },

  {
    path: "/games",
    element: <Game />,
  },
 
]);