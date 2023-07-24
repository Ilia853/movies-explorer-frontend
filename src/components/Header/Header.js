import React from "react";
import { Link } from "react-router-dom";

function Header({ loggedIn }) {
  return (
    <header className="header">
      <div className="header__logo">
        <h2 className={`header__films` + (loggedIn ? " header__display-active" : "")}>Фильмы</h2>
        <h2 className={`header__saved-films` + (loggedIn ? " header__display-active" : "")}>Сохранённые фильмы</h2>
      </div>
      <div className="header__sign-links">
        <Link to="/profile">
          <button className={`header__account-button` + (loggedIn ? " header__display-active" : "")}></button>
        </Link>
        <Link className={`header__sign-up` + (loggedIn ? " header__display-none" : "")} to="/sign-up">
          Регистрация
        </Link>
        <Link to="/sign-in">
          <button className={`header__sign-in` + (loggedIn ? " header__display-none" : "")}>Войти</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
