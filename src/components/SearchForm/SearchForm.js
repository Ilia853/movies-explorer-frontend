import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm({
  onFindMovie,
  setIsOpen,
  setPopupMessage,
  checkboxState,
  onSortMovies,
  inputData,
  setInputData
}) {
  // const [movieTitle, setMovieTitle] = useState("");

  function handleMoviesSearch(evt) {
    setInputData(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (inputData !== "") {
      onFindMovie(inputData);
      //setMovieTitle(inputData)
    } else {
      setIsOpen(true);
      setPopupMessage("Поле не должно быть пустым");
    }
  }

  return (
    <section className="search">
      <form className="movies__search-form" onSubmit={handleSubmit} noValidate>
        <input
          type="search"
          placeholder="Фильм"
          className="movies__search-input"
          required
          onChange={handleMoviesSearch}
          value={inputData}
        />
        <span className="movies__search-error"></span>
        <button type="submit" className="movies__search-button"></button>
      </form>
      <div className="short-movies">
        <p className="short-movies__title">Короткометражки</p>
        <FilterCheckbox
          checkboxState={checkboxState}
          onSortMovies={onSortMovies}
        />
      </div>
    </section>
  );
}
