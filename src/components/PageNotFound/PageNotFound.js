import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }
  return (
    <section className="page page_not-found">
      <div className="page__not-found">404</div>
      <p className="page__not-found-text">Страница не найдена</p>
      <button className="page__not-found-button" onClick={goBack}>
        Назад
      </button>
    </section>
  );
}
