import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
  movies,
  handleCreateMovie,
  handleDeleteMovie,
}) {
  return (
    <ul className="movies-list">
      {movies &&
        movies.map((item) => (
          <MoviesCard
            movies={item}
            key={item.id || item._id}
            handleCreateMovie={handleCreateMovie}
            handleDeleteMovie={handleDeleteMovie}
          />
        ))}
    </ul>
  );
}
