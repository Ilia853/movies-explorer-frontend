import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { display, displayNone } from "../../utils/const";

function Header({ openBurger }) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <header className="header">
      <nav className="header__films">
        <NavLink to="/" className="header__logo"></NavLink>
        <NavLink
          to="/movies" 
          className={({isActive}) => `header__film ${isActive ? " header__film_active" : ""}`} 
          style={pathname === "/profile" || pathname === "/movies" || pathname === "/saved-movies" ? display : displayNone}>
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className={({isActive}) => `header__film ${isActive ? " header__film_active" : ""}`}
          style={pathname === "/profile" || pathname === "/movies" || pathname === "/saved-movies" ? display : displayNone}>
          Сохранённые фильмы
        </NavLink>
      </nav>
      <div className="header__sign-links">
        <div
          className="header__burger" style={pathname === "/" ? displayNone : display}
          onClick={openBurger}>
        </div>
        <Link to="/profile"
          className="header__account-button"
          style={pathname === "/profile" || pathname === "/movies" || pathname === "/saved-movies" ? display : displayNone}>
        </Link>
        <Link
          className="header__sign-up"
          style={pathname !== "/" ? displayNone : display} to="/sign-up">
          Регистрация
        </Link>
        <Link to="/sign-in"
           className="header__sign-in" style={pathname !== "/" ? displayNone : display}>
          <p className="header__sign-in-text">Войти</p>
        </Link>
      </div>
    </header>
  );
}

export default Header;
