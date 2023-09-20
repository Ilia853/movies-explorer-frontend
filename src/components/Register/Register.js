import React from "react";
import { Link } from "react-router-dom";

export default function Register({
  submitRegister,
  handleChange,
  errors,
  setErrors,
}) {
  function disableErrors() {
    setErrors({});
  }
  return (
    <section className="register">
      <div className="register__header-logo-wrapper">
        <Link to="/">
          <div className="header__logo header__logo_type_register"></div>
        </Link>
        <h2 className="register__title">Добро пожаловать!</h2>
      </div>
      <form className="register__form" onSubmit={submitRegister} noValidate>
        <p className="register__field-name">Имя</p>
        <input
          className="register__input register__input_type_name"
          required
          name="name"
          minLength={2}
          maxLength={30}
          onChange={handleChange}
        />
        <span className="register__error">{errors.name}</span>
        <p className="register__field-name">E-mail</p>
        <input
          className="register__input register__input_type_email"
          required
          name="email"
          type="email"
          onChange={handleChange}
        />
        <span className="register__error">{errors.email}</span>
        <p className="register__field-name">Пароль</p>
        <input
          className="register__input register__input_type_password"
          type="password"
          minLength={6}
          maxLength={20}
          required
          name="password"
          onChange={handleChange}
        />
        <span className="register__error">{errors.password}</span>
        <button className="register__form-button" disabled>
          Зарегистрироваться
        </button>
      </form>
      <div className="register__sign">
        <p className="register__paragraph">Уже зарегистрированы?</p>
        <Link
          to="/sign-in"
          className="register__login-link"
          onClick={disableErrors}
        >
          Войти
        </Link>
      </div>
    </section>
  );
}
