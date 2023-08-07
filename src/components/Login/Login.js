import React from "react";
import { Link } from "react-router-dom";

export default function Login({ handleSubmitLogin, handleEmailChange, handlePasswordChange }) {
  return (
    <section className="login">
      <div className="register__header-logo-wrapper">
        <Link to="/">
          <div className="header__logo header__logo_type_register"></div>
        </Link>
        <h2 className="register__title">Рады видеть!</h2>
      </div>
      <form className="register__form">
        <p className="register__field-name">E-mail</p>
        <input
          className="register__input register__input_type_email"
          required
          onChange={handleEmailChange}
        />
        <span className="register__error"></span>
        <p className="register__field-name">Пароль</p>
        <input
          className="register__input register__input_type_password"
          type="password"
          required
          onChange={handlePasswordChange}
        />
        <span className="register__error"></span>
        <button className="register__form-button register__form-button_type_login" onClick={handleSubmitLogin}>Войти</button>
      </form>
      <div className="register__sign">
        <p className="register__paragraph">Ещё не зарегистрированы?</p>
        <Link to="/sign-up" className="register__login-link">
          Регистрация
        </Link>
      </div>
    </section>
  );
}
