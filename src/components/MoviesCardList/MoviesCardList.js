import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ cards }) {
  return (
    <ul className="movies-list">
      {cards.map((item) => (
        <MoviesCard cards={item} key={item._id} />
      ))}
    </ul>
  );
}
