import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Burger({ isOpen, closeBurger }) {
  
  return (
    <section className="burger">
      <div className={"burger__blur" + (isOpen ? " burger__menu_active" : "")} />
      <div className={"burger__menu" + (isOpen ? " burger__menu_active" : "")}>
        <button className="burger__close-btn" onClick={closeBurger} ></button>
        <nav className="burger__nav-menu">
          <NavLink
            to="/"
            className={({isActive}) => `burger__nav-link ${isActive ? " burger__nav-link_active" : ""}`}
            onClick={closeBurger}>Главная</NavLink>
          <NavLink
            to="/movies"
            className={({isActive}) => `burger__nav-link ${isActive ? " burger__nav-link_active" : ""}`}
            onClick={closeBurger}>Фильмы</NavLink>
          <NavLink
            to="/saved-movies"
            className={({isActive}) => `burger__nav-link ${isActive ? " burger__nav-link_active" : ""}`}
            onClick={closeBurger}>Сохранённые фильмы</NavLink>
        </nav>
        <Link to="/profile">
          <button className="burger__account-button" onClick={closeBurger}></button>
        </Link>
      </div>
    </section>
  )
}