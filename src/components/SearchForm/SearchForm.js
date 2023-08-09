import React, { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm({ onFindMovie, onShortMovies }) {
  const [movieTitle, setMovieTitle] = useState("");

  function handleMoviesSearch(evt) {
    setMovieTitle(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
  
    onFindMovie(movieTitle);
    setMovieTitle("")
  }
  
  return (
    <section className="search">
      <form className="movies__search-form" onSubmit={handleSubmit} >
        <input
          type="search"
          placeholder="Фильм"
          className="movies__search-input"
          required
          onChange={handleMoviesSearch}
          value={movieTitle}
        />
        <button type="submit" className="movies__search-button"></button>
      </form>
      <div className="short-movies">
        <p className="short-movies__title">Короткометражки</p>
        <FilterCheckbox onShortMovies={onShortMovies} />
      </div>
    </section>
  )
}