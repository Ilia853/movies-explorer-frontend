import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function SavedMovies({ movies, openBurger, onFindMovie, onShortMovies, handleDeleteMovie }) {
  return (
    <>
      <Header openBurger={openBurger} />
      <main className="main">
        <section className="saved-movies">
          <SearchForm movies={movies} onFindMovie={onFindMovie} onShortMovies={onShortMovies} />
          <MoviesCardList movies={movies} handleDeleteMovie={handleDeleteMovie} />
          <button className="movies__button-more movies__button-more_hidden">Ещё</button>
        </section>
      </main>
      <Footer />
    </>
  )
}