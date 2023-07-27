import React from "react";
import Header from "../Header/Header"
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <section className="profile">
      <Header />
      <h2 className="profile__title">Привет, Илья!</h2>
      <form className="profile__form">
        <div className="profile__input-wrapper">
          <p className="profile__input-title">Имя</p>
          <input className="profile__form-input" id="name" />
        </div>
        <div className="profile__input-wrapper">
          <p className="profile__input-title">E-mail</p>
          <input className="profile__form-input" id="email" />
        </div>
        <button className="profile__edit" type="submit">Редактировать</button>
      </form>
      <Link to="/" className="profile__exit">Выйти из аккаунта</Link>
    </section>
  )
}