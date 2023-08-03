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
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moviesApi from "../../utils/MoviesApi";


function App() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  // const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  
    function mountMovies(inputData) {
      moviesApi.getInitialMovies()
        .then((moviesData) => {
          const sortMovies = (movies, input) => {
            const findedMovies = movies.filter((movie) => {
              const nameRU = String(movie.nameRU).toLowerCase().trim();
              const nameEN = String(movie.nameEN).toLowerCase().trim();
              const inputValue = input.toLowerCase().trim();
              return (nameEN.indexOf(inputValue) !== -1 || nameRU.indexOf(inputValue) !== -1);
            })
            console.log(findedMovies);
            return findedMovies;
          }
          console.log(inputData);
          const sortedMovies = sortMovies(moviesData, inputData);
          setMovies(sortedMovies);
        })
        .catch((err) => {
          console.log("getMoviesError", err);
        });
    }

  function openBurger() {
    setIsBurgerOpen(true);
  }

  function closeBurger() {
    setIsBurgerOpen(false);
  }

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    navigate("/movies");
    // setLoggedIn(true);
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login handleSubmitLogin={handleSubmitLogin} />} />
        <Route path="/movies" element={<Movies
          movies={movies}
          openBurger={openBurger}
          onFindMovie={mountMovies}
          />} />
        <Route path="/saved-movies" element={<SavedMovies movies={movies} openBurger={openBurger} />} />
        <Route path="/profile" element={<Profile openBurger={openBurger} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Burger isOpen={isBurgerOpen} closeBurger={closeBurger} />
    </div>
  );
}

export default App;
