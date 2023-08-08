import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ movies, handleCreateMovie }) {
  console.log(movies);
  return (
    <ul className="movies-list">
      {movies && movies.map((item) => (
        <MoviesCard movies={item} key={item.id} handleCreateMovie={handleCreateMovie} />
      ))}
    </ul>
  );
}
