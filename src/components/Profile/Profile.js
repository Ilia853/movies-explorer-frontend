import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Profile({
  openBurger,
  clearMovies,
  handleUpdateUser,
  loggedIn,
  setLoggedIn,
  setInputData,
  setCheckBoxState,
  loadCreatedMovies,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function checkValidity(name, email) {
    if (currentUser.name === name && currentUser.email === email) {
      setError("введенные данные совпадают с текущими");
      setIsValid(false);
    } else if (!isValidEmail(email)) {
      setError("некорректный email");
      setIsValid(false);
    } else {
      setError("");
      setIsValid(true);
    }
  }

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  useEffect(() => {
    checkValidity(name, email);
  }, [name, email, currentUser]);

  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("searchedMovies");
    localStorage.removeItem("filteredMovies");
    localStorage.removeItem("checkboxState");
    localStorage.removeItem("inputData");
    clearMovies();
    setLoggedIn(false);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleUpdateUser({
      name,
      email,
    });
  }

  return (
    <section className="profile">
      <Header
        openBurger={openBurger}
        loggedIn={loggedIn}
        setInputData={setInputData}
        setCheckBoxState={setCheckBoxState}
        loadCreatedMovie={loadCreatedMovies}
      />
      <h2 className="profile__title">Привет, {name}!</h2>
      <span className="profile__error">{error}</span>
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
        <button
          className="profile__edit"
          type="submit"
          disabled={!isValid ? true : false}
        >
          Редактировать
        </button>
      </form>
      <Link to="/" className="profile__exit" onClick={signOut}>
        Выйти из аккаунта
      </Link>
    </section>
  );
}
