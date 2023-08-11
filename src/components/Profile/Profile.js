import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Profile({
  openBurger,
  clearMovies,
  handleUpdateUser,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();


  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("searchedMovies");
    clearMovies();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if(currentUser.name === name || currentUser.email === email) {
      // alert("введенные данные совпадают с текущими")
      const profileError = document.querySelector(".profile__error")
      profileError.textContent = "введенные данные совпадают с текущими"
      setTimeout(() => {
        profileError.textContent = ""
      }, 1500);
    } else {
      handleUpdateUser({
        name,
        email,
      });
      navigate("/movies", { replace: true });
    }
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  return (
    <section className="profile">
      <Header openBurger={openBurger} />
      <h2 className="profile__title">Привет, {name}!</h2>
      <span className="profile__error"></span>
      <form className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__input-wrapper">
          <p className="profile__input-title">Имя</p>
          <input
            className="profile__form-input"
            id="name"
            value={name || ""}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="profile__input-wrapper">
          <p className="profile__input-title">E-mail</p>
          <input
            className="profile__form-input"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button className="profile__edit" type="submit">
          Редактировать
        </button>
      </form>
      <Link to="/" className="profile__exit" onClick={signOut}>
        Выйти из аккаунта
      </Link>
    </section>
  );
}
