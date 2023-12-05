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
