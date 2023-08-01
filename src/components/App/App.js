import React, { useState, useEffect } from "react";
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
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moviesApi from "../../utils/MoviesApi";


function App() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
    moviesApi.getInitialMovies()
      .then((moviesData) => {
        setMovies(moviesData);
        console.log("moviesData", moviesData);
      })
      .catch((err) => {
        console.log("getMovies", err);
      });
    }
  }, [loggedIn])

  function openBurger() {
    setIsBurgerOpen(true);
  }

  function closeBurger() {
    setIsBurgerOpen(false);
  }

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    navigate("/movies");
    setLoggedIn(true);
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login handleSubmitLogin={handleSubmitLogin} />} />
        <Route path="/movies" element={<Movies movies={movies} openBurger={openBurger} />} />
        <Route path="/saved-movies" element={<SavedMovies movies={movies} openBurger={openBurger} />} />
        <Route path="/profile" element={<Profile openBurger={openBurger} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Burger isOpen={isBurgerOpen} closeBurger={closeBurger} />
    </div>
  );
}

export default App;
