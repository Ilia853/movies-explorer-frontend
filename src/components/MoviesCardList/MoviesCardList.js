import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
  movies,
  handleCreateMovie,
  handleDeleteMovie,
  moviesAmount,
  createdMovies,
}) {
  return (
    <ul className="movies-list">
      {movies &&
        movies
          .slice(0, moviesAmount)
          .map((item) => (
            <MoviesCard
              movies={item}
              key={item.id || item._id}
              handleCreateMovie={handleCreateMovie}
              handleDeleteMovie={handleDeleteMovie}
              createdMovies={createdMovies}
            />
          ))}
    </ul>
  );
}
