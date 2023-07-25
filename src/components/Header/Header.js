import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const pathname = location.pathname;
  const display = {
    display: "inline"
  }
  const displayNone = {
    display: "none"
  }

  return (
    <header className="header">
      <div className="header__logo">
        <h2 className="header__films" style={pathname === "/movies" ? display : displayNone}>Фильмы</h2>
        {/* <h2 className={`header__films` + (pathname === "/movies" ? " header__display-active" : "")}>Фильмы</h2> */}
        <h2 className="header__saved-films" style={pathname === "/movies" ? display : displayNone}>Сохранённые фильмы</h2>
      </div>
      <div className="header__sign-links">
        <div className="header__burger"></div>
        <Link to="/profile">
          <button className="header__account-button" style={pathname === "/movies" ? display : displayNone}></button>
        </Link>
        <Link className="header__sign-up" style={pathname !== "/" ? displayNone : display} to="/sign-up">
          Регистрация
        </Link>
        <Link to="/sign-in">
          <button className="header__sign-in" style={pathname !== "/" ? displayNone : display}>Войти</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
