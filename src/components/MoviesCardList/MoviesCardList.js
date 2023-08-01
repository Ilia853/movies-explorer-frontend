import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ movies }) {
  return (
    <ul className="movies-list">
      {movies.map((item) => (
        <MoviesCard movies={item} key={item.id} />
      ))}
    </ul>
  );
}
