import React from "react";
import { Link, NavLink } from "react-router-dom";
import { display, displayNone } from "../../utils/const";

function Header({
  openBurger,
  loggedIn,
  setInputData,
  setCheckBoxState,
  loadCreatedMovies,
}) {
  function clearStates() {
    setInputData("");
    setCheckBoxState(false);
    loadCreatedMovies();
  }

  function loadStates() {
    setInputData(JSON.parse(localStorage.getItem("inputData")));
    setCheckBoxState(JSON.parse(localStorage.getItem("checkboxState")));
  }

  return (
    <header className="header">
      <nav className="header__films">
        <NavLink to="/" className="header__logo"></NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `header__film ${isActive ? " header__film_active" : ""}`
          }
          style={loggedIn ? display : displayNone}
          onClick={loadStates}
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className={({ isActive }) =>
            `header__film ${isActive ? " header__film_active" : ""}`
          }
          style={loggedIn ? display : displayNone}
          onClick={clearStates}
        >
          Сохранённые фильмы
        </NavLink>
      </nav>
      <div className="header__sign-links">
        <div
          className="header__burger"
          style={!loggedIn === "/" ? displayNone : display}
          onClick={openBurger}
        ></div>
        <Link
          to="/profile"
          className="header__account-button"
          style={loggedIn ? display : displayNone}
        ></Link>
        <Link
          className="header__sign-up"
          style={!loggedIn ? display : displayNone}
          to="/sign-up"
        >
          Регистрация
        </Link>
        <Link
          to="/sign-in"
          className="header__sign-in"
          style={!loggedIn ? display : displayNone}
        >
          <p className="header__sign-in-text">Войти</p>
        </Link>
      </div>
    </header>
  );
}

export default Header;
