import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm() {
    return (
      <section className="search">
        <form className="movies__search-form">
          <input type="search" placeholder="     Фильм" className="movies__search-input" required />
          <button type="submit" className="movies__search-button"></button>
        </form>
        <div className="short-movies">
          <p className="short-movies__title">Короткометражки</p>
          <FilterCheckbox />
        </div>
      </section>
    )
}