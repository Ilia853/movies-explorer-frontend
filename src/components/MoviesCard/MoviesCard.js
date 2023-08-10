import React from "react";
import { MOVIES_URL } from "../../utils/const";
import { useLocation } from "react-router-dom";

export default function MoviesCard({ movies, handleCreateMovie, handleDeleteMovie }) {
  const location = useLocation();
  const pathname = location.pathname;

  function getTimeFromMins(mins) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return hours + " ч " + minutes + " м";
  }

  const takeMoviesData = () => {
    if(pathname === "/movies") {
      handleCreateMovie(movies);
    } else {
      handleDeleteMovie(movies._id)
      console.log("movie was deleted");
    }
  };

  return (
    <li className="movies-card">
      <a href={movies.trailerLink} target="blank">
        <img
          className="movies-card__img"
          src={
            pathname === "/movies"
              ? `${MOVIES_URL}${movies.image.url}`
              : movies.image
          }
          alt={movies.description}
        />
      </a>
      <button
        className={movies.isLiked ? "movies-card__button movies-card__button_type_like"
          : "movies-card__button"
          && pathname === "/saved-movies" ? "movies-card__button movies-card__button_type_del"
          : "movies-card__button"}
        onClick={takeMoviesData}
      ></button>
      <div className="movies-card__discription">
        <h2 className="movies-card__title">{movies.nameRU}</h2>
        <span className="movies-card__duration">
          {getTimeFromMins(movies.duration)}
        </span>
      </div>
    </li>
  );
}
