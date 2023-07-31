import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <section className="register">
      <div className="register__header-logo-wrapper">
        <Link to="/">
          <div className="header__logo header__logo_type_register"></div>
        </Link>
        <h2 className="register__title">Добро пожаловать!</h2>
      </div>
      <form className="register__form">
        <p className="register__field-name">Имя</p>
        <input className="register__input register__input_type_name" required />
        <span className="register__error"></span>
        <p className="register__field-name">E-mail</p>
        <input className="register__input register__input_type_email" required />
        <span className="register__error"></span>
        <p className="register__field-name">Пароль</p>
        <input
          className="register__input register__input_type_password"
          type="password"
          required
        />
        <span className="register__error">Что-то пошло не так...</span>
        <button className="register__form-button">Зарегистрироваться</button>
      </form>
      <div className="register__sign">
        <p className="register__paragraph">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__login-link">
          Войти
        </Link>
      </div>
    </section>
  );
}
