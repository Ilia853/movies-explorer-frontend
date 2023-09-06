import React from "react";
import { Link } from "react-router-dom";

export default function Login({ handleSubmitLogin, handleChange, errors }) {

  function login(evt) {
    evt.preventDefault();
    handleSubmitLogin()
  }

  return (
    <section className="login">
      <div className="register__header-logo-wrapper">
        <Link to="/">
          <div className="header__logo header__logo_type_register"></div>
        </Link>
        <h2 className="register__title">Рады видеть!</h2>
      </div>
      <form className="register__form" onSubmit={login} noValidate>
        <p className="register__field-name">E-mail</p>
        <input
          className="register__input register__input_type_email"
          required
          onChange={handleChange}
          type="email"
          name="email"
        />
        <span className="register__error">{errors.email}</span>
        <p className="register__field-name">Пароль</p>
        <input
          className="register__input register__input_type_password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          minLength={6}
        />
        <span className="register__error">{errors.password}</span>
        <button
          className="register__form-button register__form-button_type_login"
          onClick={handleSubmitLogin}
          disabled
        >
          Войти
        </button>
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
