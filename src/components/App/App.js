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
import * as auth from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [longMovies, setLongMovies] = useState([]);
  const [switchPreloader, setSwitchPreloader] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  function mountMovies(inputData) {
    setSwitchPreloader(true);
    moviesApi
      .getInitialMovies()
      .then((moviesData) => {
        const sortMovies = (movies, input) => {
          const findedMovies = movies.filter((movie) => {
            const nameRU = movie.nameRU.toLowerCase().trim();
            const nameEN = movie.nameEN.toLowerCase().trim();
            const inputValue = input.toLowerCase().trim();
            return (
              nameEN.indexOf(inputValue) !== -1 ||
              nameRU.indexOf(inputValue) !== -1
            );
          });
          return findedMovies;
        };
        const sortedMovies = sortMovies(moviesData, inputData);
        setMovies(sortedMovies);
        setSwitchPreloader(false)
        setLongMovies(sortedMovies);
      })
      .catch((err) => {
        console.log("getMoviesError", err);
      });
  }

  const checkbox = document.querySelector(".filter-checkbox-icon");
  function toggleCheckBox() {
    checkbox.classList.toggle('filter-checkbox-icon_active');
  }

  function mountShortMovies() {
    const isChecked = document.getElementById("checkbox");
    if (isChecked.checked) {
      toggleCheckBox();
      const shortMovies = movies.filter((movie) => {
        const shortMovie = movie.duration < 80;
        return shortMovie;
      });
      setMovies(shortMovies);
      // console.log(shortMovies);
    } else {
      toggleCheckBox();
      setMovies(longMovies);
    }
  }

  function openBurger() {
    setIsBurgerOpen(true);
  }

  function closeBurger() {
    setIsBurgerOpen(false);
  }

  // const handleSubmitLogin = (e) => {
  //   e.preventDefault();
  //   navigate("/movies");
  //   // setLoggedIn(true);
  // };

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
}

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  const handleSubmitLogin = (evt) => {
    evt.preventDefault();
    if (!email || !password) {
      console.log("Введите почту и пароль");
      return;
    }
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setPassword("");
          handleLogin();
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        console.log("Login", err);
        console.log("Что-то пошло не так! Попробуйте ещё раз.");
      });
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    auth.register(name, email, password)
      .then((res) => {
        if (res) {
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
};

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/sign-up"
          element={
            <Register
              submitRegister={handleSubmitRegister}
              handleNameChange={handleNameChange}
              handleEmailChange={handleEmailChange}
              handlePasswordChange={handlePasswordChange}
            />
          }
        />
        <Route
          path="/sign-in"
          element={
            <Login
              handleSubmitLogin={handleSubmitLogin}
              handleEmailChange={handleEmailChange}
              handlePasswordChange={handlePasswordChange}
            />
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute
              element={Movies}
              movies={movies}
              openBurger={openBurger}
              onFindMovie={mountMovies}
              onShortMovies={mountShortMovies}
              switchPreloader={switchPreloader}
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute
              element={SavedMovies}
              movies={movies}
              openBurger={openBurger}
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={Profile} openBurger={openBurger} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Burger isOpen={isBurgerOpen} closeBurger={closeBurger} />
    </div>
  );
}

export default App;
