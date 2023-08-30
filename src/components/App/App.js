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
  const [popupMessage, setPopupMessage] =useState("");
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  console.log(values);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest(".register__form").checkValidity());
  };

  const activeButton = (isValid) => {
    if(isValid) {
      const button = document.querySelector(".register__form-button")
      if(button) {
        button.removeAttribute("disabled")
      }
    } else {
      return
    }
  }

  useEffect(() => {
    activeButton(isValid);
  }, [isValid])

  useEffect(() => {
    if (loggedIn) {
      console.log(movies);
      mainApi
        .getMovies()
        .then((movies) => {
          console.log(movies);
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
    if (createdMovies.some((m) => m.movieId === movie.id)) {
      setIsOpen(true)
      setPopupMessage("Такой фильм уже в вашей коллекции")
    } else {
      mainApi
        .createMovie(movie)
        .then((movie) => {
          setCreatedMovies([movie, ...createdMovies]);
        })
        .catch((err) => {
          console.log("createMovieError", err);
        });
    }
  }

  useEffect(() => {
    console.log(movies);
    const finalMovies = setLikedMovies(movies ,createdMovies)
    console.log(finalMovies);
    setMovies(finalMovies);
    setLongMovies(finalMovies);
  }, [createdMovies])

  function handleDeleteMovie(id) {
    console.log(id);
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
        if(sortedMovies.length === 0) {
          setSwitchPreloader(false);
          setIsOpen(true);
          setPopupMessage("Ничего не нашлось, попробуйте ввести другой запрос.")
        } else {
          const finalMovies = setLikedMovies(sortedMovies ,createdMovies)
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
        return m.movieId === movie.id
      })
      if(likedMovie) {
        movie.isLiked = true;
      } else {
        movie.isLiked =false;
      }
      return movie;
    })
    return likedMovies;
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
      console.log(movies);
      shortMovies(movies)
      setMovies(shortMovies);
    } else {
      toggleCheckBox();
      setMovies(longMovies);
    }
  }

  function mountCreatedShortMovies() {
    const isChecked = document.getElementById("checkbox");
    if (isChecked.checked) {
      toggleCheckBox();
      shortMovies(createdMovies)
      setCreatedMovies(shortMovies);
    } else {
      toggleCheckBox();
      setCreatedMovies(longCreatedMovies);
    }
  }

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

  const tokenCheck = () => {
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
            handleLogin();
            setCurrentUser(userData);
            navigate("/movies", { replace: true });
            if (localStorage.length > 3) {
              setMovies(JSON.parse(localStorage.getItem("searchedMovies")));
            }
            setLongMovies(JSON.parse(localStorage.getItem("searchedMovies")));
          }
        })
        .catch((err) => {
          console.log("TokenCheckError", err);
        });
    }
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  const handleSubmitLogin = (evt) => {
    evt.preventDefault();
    if (!values.email || !values.password) {
      console.log("Введите почту и пароль");
      return;
    }
    auth
      .authorize(values.email, values.password)
      .then((data) => {
        if (data.token) {
          auth.getProfile(data.token)
          .then((res) => {
            const userData = {
              email: res.email,
              name: res.name,
            };
            setCurrentUser(userData)
          })
          .catch((err) => {
            console.log("User Data Error", err);
          })
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
      .register(values.name, values.email, values.password)
      .then((res) => {
        if (res) {
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  function closePopup() {
    setIsOpen(false)
  }

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
                handleChange={handleChange}
                values={values}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Burger isOpen={isBurgerOpen} closeBurger={closeBurger} />
        <Popup onClose={closePopup} isOpen={isOpen} popupMessage={popupMessage} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
