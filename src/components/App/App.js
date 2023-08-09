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
import { Route, Routes, useNavigate } from "react-router-dom";
import moviesApi from "../../utils/MoviesApi";
import * as auth from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";

function App() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [longMovies, setLongMovies] = useState([]);
  const [switchPreloader, setSwitchPreloader] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [createdMovies, setCreatedMovies] = useState([]);
  const [longCreatedMovies, setLongCreatedMovies] = useState([]);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (loggedIn) {
  //     mainApi
  //       .getProfile()
  //       .then((userData) => {
  //         console.log("USERDATA", userData);
  //         setCurrentUser(userData);
  //       })
  //       .catch((err) => {
  //         console.log("userDataError", err);
  //       });
  //   }
  // }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getMovies()
        .then((movies) => {
          setCreatedMovies(movies);
          setLongCreatedMovies(movies);
        })
        .catch((err) => {
          console.log("getSavedMoviesError", err);
        });
    }
  }, [loggedIn]);

  function handleUpdateUser(userData) {
    mainApi
      .editProfile(userData.name, userData.email)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log("editProfile", err);
      });
  }

  function handleCreateMovie(movie) {
    mainApi.createMovie(movie)
        .then((movie) => {
            setCreatedMovies([movie, ...createdMovies]);
        })
        .catch((err) => {
            console.log("createMovieError", err);
        });
  }

  function handleDeleteMovie(id) {
    mainApi.delMovie(id)
        .then(() => {
            setCreatedMovies((movies) => movies.filter((m) => m._id !== id));
        })
        .catch((err) => {
            console.log("deletingMovieError", err);
        })
  }

  function saveInStorage(movies, where) {
    localStorage.setItem(where, JSON.stringify(movies));
  }

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

  function toggleCheckBox() {
    const checkbox = document.querySelector(".filter-checkbox-icon");
    checkbox.classList.toggle("filter-checkbox-icon_active");
  }

  function searchMovies(inputData) {
    clearMovies();
    setSwitchPreloader(true);
    moviesApi
      .getInitialMovies()
      .then((moviesData) => {
        const sortedMovies = sortMovies(moviesData, inputData);
        saveInStorage(sortedMovies, "searchedMovies");
        setMovies(sortedMovies);
        setLongMovies(sortedMovies);
        setSwitchPreloader(false);
      })
      .catch((err) => {
        console.log("getMoviesError", err);
      });
  }

  function searchSavedMovies(inputData) {
    setSwitchPreloader(true);
    const sortedMovies = sortMovies(createdMovies, inputData);
    setCreatedMovies(sortedMovies);
    setSwitchPreloader(false);
  }

  const shortMovies = (movies) => movies.filter((movie) => {
    const shortMovie = movie.duration < 40;
    return shortMovie;
  });

  function mountShortMovies() {
    const isChecked = document.getElementById("checkbox");
    if (isChecked.checked) {
      toggleCheckBox();
      shortMovies(movies)
      setMovies(shortMovies);
    } else {
      toggleCheckBox();
      setMovies(longMovies);
    }}

    function mountCreatedShortMovies() {
      const isChecked = document.getElementById("checkbox");
      if (isChecked.checked) {
        toggleCheckBox();
        shortMovies(createdMovies)
        setCreatedMovies(shortMovies);
      } else {
        toggleCheckBox();
        setCreatedMovies(longCreatedMovies);
      }}

  function clearMovies() {
    setMovies([]);
  }

  function openBurger() {
    setIsBurgerOpen(true);
  }

  function closeBurger() {
    setIsBurgerOpen(false);
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      mainApi.setToken(token);
      auth
        .getProfile(token)
        .then((res) => {
          if (res) {
            const userData = {
              email: res.email,
              name: res.name,
            };
            setCurrentUser(userData);
            handleLogin();
            navigate("/movies", { replace: true });
            setMovies(JSON.parse(localStorage.getItem("searchedMovies")));
            setLongMovies(JSON.parse(localStorage.getItem("searchedMovies")));
          }
        })
        .catch((err) => {
          console.log("TokenCheckError", err);
        });
    }
  }

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
    auth
      .authorize(email, password)
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
    auth
      .register(name, email, password)
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
      <CurrentUserContext.Provider value={currentUser}>
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
                onFindMovie={searchMovies}
                onShortMovies={mountShortMovies}
                switchPreloader={switchPreloader}
                loggedIn={loggedIn}
                handleCreateMovie={handleCreateMovie}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                movies={createdMovies}
                openBurger={openBurger}
                loggedIn={loggedIn}
                onFindMovie={searchSavedMovies}
                onShortMovies={mountCreatedShortMovies}
                handleDeleteMovie={handleDeleteMovie}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                openBurger={openBurger}
                loggedIn={loggedIn}
                clearMovies={clearMovies}
                handleUpdateUser={handleUpdateUser}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Burger isOpen={isBurgerOpen} closeBurger={closeBurger} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
