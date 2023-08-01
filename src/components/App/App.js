import React, { useState } from "react";
import "./App.css";
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import PageNotFound from "../PageNotFound/PageNotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Burger from "../Burger/Burger";
import { cards } from "../../utils/const";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function App() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  function openBurger() {
    setIsBurgerOpen(true);
  }

  function closeBurger() {
    setIsBurgerOpen(false);
  }

  const navigate = useNavigate();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    navigate("/movies");
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login handleSubmitLogin={handleSubmitLogin} />} />
        <Route path="/movies" element={<Movies cards={cards} openBurger={openBurger} />} />
        <Route path="/saved-movies" element={<SavedMovies cards={cards} openBurger={openBurger} />} />
        <Route path="/profile" element={<Profile openBurger={openBurger} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Burger isOpen={isBurgerOpen} closeBurger={closeBurger} />
    </div>
  );
}

export default App;
