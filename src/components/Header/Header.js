import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__sign-links">
        <Link className="header__sign-up" to="/sign-up">
          Регистрация
        </Link>
        <Link to="/sign-in">
          <button className="header__sign-in">Войти</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
