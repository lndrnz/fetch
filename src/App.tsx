import Login from "./pages/Login";
import Logout from "./pages/Logout";
import SearchBreeds from "./pages/SearchBreeds";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import Favorites from "./pages/Favorites";

function App({}) {
  const Auth = localStorage.getItem("isLoggedIn") === "true";

  return (
    <AppProvider>
      <BrowserRouter>
        {Auth === true ? <Logout /> : <></>}
        <audio controls autoPlay>
        <source src="LastChristmas.mp3" type="audio/mp3" />
      </audio>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/search" element={<SearchBreeds />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
