import React, { useState, useEffect } from "react";
import "./App.css";
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
import Popup from "../Popup/Popup";

function App() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [longMovies, setLongMovies] = useState([]);
  const [switchPreloader, setSwitchPreloader] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [createdMovies, setCreatedMovies] = useState([]);
  const [longCreatedMovies, setLongCreatedMovies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [inputData, setInputData] = useState("");
  const [checkboxState, setCheckBoxState] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    const checkValidity = target.closest(".register__form").checkValidity();

    function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    }

    if (!isValidEmail(values.email) && name === "email") {
      setIsValid(false);
      setErrors({ ...errors, [name]: "email is invalid" });
    } else if (!checkValidity) {
      setIsValid(false);
      setErrors({ ...errors, [name]: target.validationMessage });
    } else {
      setIsValid(true);
      setErrors({});
    }
  };

  const activeButton = (isValid) => {
    if (isValid) {
      const button = document.querySelector(".register__form-button");
      if (button) {
        button.removeAttribute("disabled");
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    activeButton(isValid);
  }, [isValid]);

  useEffect(() => {
    if (loggedIn) {
      tokenCheck();
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
        setPopupMessage("Профиль успешно обновлен");
        setIsOpen(true);
      })
      .catch((err) => {
        console.log("editProfile", err);
      });
  }

  function handleCreateMovie(movie) {
    mainApi
      .createMovie(movie)
      .then((movie) => {
        setCreatedMovies([movie, ...createdMovies]);
        setLongCreatedMovies([movie, ...longCreatedMovies]);
      })
      .catch((err) => {
        console.log("createMovieError", err);
      });
  }

  function handleDeleteMovie(id) {
    mainApi
      .delMovie(id)
      .then(() => {
        setCreatedMovies((movies) => movies.filter((m) => m._id !== id));
        setLongCreatedMovies((movies) => movies.filter((m) => m._id !== id));
      })
      .catch((err) => {
        console.log("deletingMovieError", err);
      });
  }

  useEffect(() => {
    const finalMovies = setLikedMovies(movies, createdMovies);
    setMovies(finalMovies);
    setLongMovies(finalMovies);
  }, [createdMovies]);

  function saveInStorage(what, where) {
    localStorage.setItem(where, JSON.stringify(what));
  }

  const sortMovies = (movies, input) => {
    const findedMovies = movies.filter((movie) => {
      const nameRU = movie.nameRU.toLowerCase().trim();
      const nameEN = movie.nameEN.toLowerCase().trim();
      const inputValue = input.toLowerCase().trim();
      return (
        nameEN.indexOf(inputValue) !== -1 || nameRU.indexOf(inputValue) !== -1
      );
    });
    return findedMovies;
  };

  function searchMovies(inputData) {
    setCheckBoxState(false);
    clearMovies();
    setSwitchPreloader(true);
    moviesApi
      .getInitialMovies()
      .then((moviesData) => {
        const sortedMovies = sortMovies(moviesData, inputData);
        if (sortedMovies.length === 0) {
          setSwitchPreloader(false);
          setPopupMessage("Ничего не нашлось, попробуйте другой запрос.");
          setIsOpen(true);
        } else {
          saveInStorage(inputData, "inputData");
          const finalMovies = setLikedMovies(sortedMovies, createdMovies);
          saveInStorage(finalMovies, "searchedMovies");
          setMovies(finalMovies);
          setLongMovies(finalMovies);
          setSwitchPreloader(false);
        }
      })
      .catch((err) => {
        console.log("getMoviesError", err);
      });
  }

  function setLikedMovies(moviesData, createMoviesData) {
    const likedMovies = moviesData.map((movie) => {
      const likedMovie = createMoviesData.some((m) => {
        return m.movieId === movie.id;
      });
      if (likedMovie) {
        movie.isLiked = true;
      } else {
        movie.isLiked = false;
      }
      return movie;
    });
    return likedMovies;
  }

  function searchSavedMovies(inputData) {
    const sortedMovies = sortMovies(createdMovies, inputData);
    if (sortedMovies.length === 0) {
      setSwitchPreloader(false);
      setPopupMessage("Ничего не нашлось, попробуйте другой запрос.");
      setIsOpen(true);
    } else {
      setCreatedMovies(sortedMovies);
      setSwitchPreloader(false);
    }
  }

  const filterMovies = (movies) =>
    movies.filter((movie) => {
      const shortMovie = movie.duration < 40;
      return shortMovie;
    });

  function mountShortMovies() {
    if (!checkboxState) {
      setCheckBoxState(true);
      const shortMovies = filterMovies(movies);
      setMovies(shortMovies);
      saveInStorage(shortMovies, "filteredMovies");
      saveInStorage(longMovies, "searchedMovies");
      saveInStorage(true, "checkboxState");
    } else {
      setCheckBoxState(false);
      setLongMovies(JSON.parse(localStorage.getItem("searchedMovies")));
      setMovies(JSON.parse(localStorage.getItem("searchedMovies")));
      console.log(movies);
      console.log(longMovies);
      saveInStorage(false, "checkboxState");
    }
  }

  function mountCreatedShortMovies() {
    if (!checkboxState) {
      setCheckBoxState(true);
      const shortMovies = filterMovies(createdMovies);
      setCreatedMovies(shortMovies);
    } else {
      setCheckBoxState(false);
      setCreatedMovies(longCreatedMovies);
    }
  }

  function clearMovies() {
    setMovies([]);
    setLongMovies([]);
  }

  function openBurger() {
    setIsBurgerOpen(true);
  }

  function closeBurger() {
    setIsBurgerOpen(false);
  }

  const tokenCheck = () => {
    const token = localStorage.getItem("token");
    console.log(token);
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
            handleLogin();
            setCurrentUser(userData);
            navigate("/movies", { replace: true });
            console.log(localStorage);
            const searchedMovies = JSON.parse(
              localStorage.getItem("searchedMovies")
            );
            const filteredMovies = JSON.parse(
              localStorage.getItem("filteredMovies")
            );
            setInputData(JSON.parse(localStorage.getItem("inputData")));
            if (searchedMovies && localStorage.checkboxState === "false") {
              setMovies(searchedMovies);
              setCheckBoxState(false);
            } else if (
              filteredMovies &&
              localStorage.checkboxState === "true"
            ) {
              setMovies(filteredMovies);
              setCheckBoxState(true);
            }
          }
        })
        .catch((err) => {
          console.log("TokenCheckError", err);
        });
    }
  };

  function handleLogin() {
    setLoggedIn(true);
  }

  const handleSubmitLogin = () => {
    if (!values.email || !values.password) {
      setIsOpen(true);
      setPopupMessage("Введите почту и пароль");
      return;
    }
    auth
      .authorize(values.email, values.password)
      .then((data) => {
        if (data.token) {
          auth
            .getProfile(data.token)
            .then((res) => {
              const userData = {
                email: res.email,
                name: res.name,
              };
              setCurrentUser(userData);
              saveInStorage(false, "checkboxState");
              setCheckBoxState(false);
              saveInStorage("", "inputData");
            })
            .catch((err) => {
              console.log("User Data Error", err);
            });
          handleLogin();
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        console.log("Что-то пошло не так! Попробуйте ещё раз");
      });
  };

  const handleSubmitRegister = (evt) => {
    evt.preventDefault();
    auth
      .register(values.name, values.email, values.password)
      .then((res) => {
        if (res) {
          console.log(res);
          handleSubmitLogin();
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  function closePopup() {
    setIsOpen(false);
  }

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={<Main loggedIn={loggedIn} setInputData={setInputData} />}
          />
          <Route
            path="/sign-up"
            element={
              <Register
                submitRegister={handleSubmitRegister}
                handleChange={handleChange}
                errors={errors}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                handleSubmitLogin={handleSubmitLogin}
                handleChange={handleChange}
                errors={errors}
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
                onSortMovies={mountShortMovies}
                checkboxState={checkboxState}
                switchPreloader={switchPreloader}
                loggedIn={loggedIn}
                handleCreateMovie={handleCreateMovie}
                createdMovies={createdMovies}
                handleDeleteMovie={handleDeleteMovie}
                setIsOpen={setIsOpen}
                setPopupMessage={setPopupMessage}
                inputData={inputData}
                setInputData={setInputData}
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
                onSortMovies={mountCreatedShortMovies}
                checkboxState={checkboxState}
                handleDeleteMovie={handleDeleteMovie}
                setIsOpen={setIsOpen}
                setPopupMessage={setPopupMessage}
                inputData={inputData}
                setInputData={setInputData}
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
                handleChange={handleChange}
                values={values}
                setLoggedIn={setLoggedIn}
                setInputData={setInputData}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Burger isOpen={isBurgerOpen} closeBurger={closeBurger} />
        <Popup
          onClose={closePopup}
          isOpen={isOpen}
          popupMessage={popupMessage}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
