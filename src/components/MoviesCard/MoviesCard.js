import React from "react";

export default function MoviesCard({ movies, handleCreateMovie }) {

  function getTimeFromMins(mins) {
    const hours = Math.trunc(mins/60);
    const minutes = mins % 60;
    return hours + " ч " + minutes + " м";
  };

  const takeMoviesData = () => {
    handleCreateMovie(movies);
  }

  return (
    <li className="movies-card">
      <a href={movies.trailerLink} target="blank">
        <img className="movies-card__img"
          src={`https://api.nomoreparties.co/${movies.image.url}`}
          alt="Кадр из фильма"
        />
      </a>
      <button className="movies-card__button" onClick={takeMoviesData} ></button>
      <div className="movies-card__discription">
        <h2 className="movies-card__title">{movies.nameRU}</h2>
        <span className="movies-card__duration">{getTimeFromMins(movies.duration)}</span>
      </div>
    </li>
  )
}