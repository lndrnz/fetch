import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import Login from "./pages/Login";
import SearchBreeds from "./pages/Search/SearchBreeds";
import Favorites from "./pages/Favorites";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
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
