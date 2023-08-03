import React from "react";

export default function MoviesCard({ movies }) {
  console.log(movies.trailerLink);
  return (
    <li className="movies-card">
      <a href={movies.trailerLink} target="blank">
        <img className="movies-card__img"
          src={`https://api.nomoreparties.co/${movies.image.url}`}
          alt="Кадр из фильма"
        />
      </a>
      <button className="movies-card__button"></button>
      <div className="movies-card__discription">
        <h2 className="movies-card__title">{movies.nameRU}</h2>
        <span className="movies-card__duration">{movies.duration}</span>
      </div>
    </li>
  )
}