import React, { useState, useEffect } from "react";
import Header from "../Header/Header"
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Profile({ openBurger }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(currentUser.name)
    setEmail(currentUser.email)
    }, [currentUser])

  function signOut(){
    localStorage.removeItem("token");
  }

  return (
    <section className="profile">
      <Header openBurger={openBurger} />
      <h2 className="profile__title">Привет, {name}!</h2>
      <form className="profile__form">
        <div className="profile__input-wrapper">
          <p className="profile__input-title">{name}</p>
          <input className="profile__form-input" id="name" required />
        </div>
        <div className="profile__input-wrapper">
          <p className="profile__input-title">{email}</p>
          <input className="profile__form-input" id="email" required />
        </div>
        <button className="profile__edit" type="submit">Редактировать</button>
      </form>
      <Link to="/" className="profile__exit" onClick={signOut}>Выйти из аккаунта</Link>
    </section>
  )
}