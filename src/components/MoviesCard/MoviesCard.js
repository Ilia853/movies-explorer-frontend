import React from "react";

export default function MoviesCard({ cards }) {
  return (
    <li className="movies-card">
      <img className="movies-card__img" src={cards.picture} alt="Кадр из фильма" />
      <button className="movies-card__button"></button>
      <div className="movies-card__discription">
        <h2 className="movies-card__title">{cards.title}</h2>
        <span className="movies-card__duration">{cards.duration}</span>
      </div>
    </li>
  )
}