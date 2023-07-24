import React from "react";

export default function MoviesCard() {
  return (
    <li className="movies-card">
      <img className="movies-card__img" src={require("../../images/pic.png")} alt="Кадр из фильма" />
      <button className="movies-card__button"></button>
      <div className="movies-card__discription">
        <h2 className="movies-card__title">33 слова о дизайне</h2>
        <span className="movies-card__duration">1ч 17м</span>
      </div>
    </li>
  )
}