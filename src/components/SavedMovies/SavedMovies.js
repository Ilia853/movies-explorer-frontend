import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function SavedMovies({
  movies,
  openBurger,
  onFindMovie,
  onShortMovies,
  handleDeleteMovie,
}) {
  const [moviesAmount, setMoviesAmount] = useState(12);

  function handleMovieAmount() {
    if (window.innerWidth > 1139) {
      setMoviesAmount(12);
    } else if (707 < window.innerWidth && window.innerWidth < 1140) {
      setMoviesAmount(8);
    } else {
      setMoviesAmount(5);
    }
  }

  function addMovies() {
    if (window.innerWidth > 1139) {
      setMoviesAmount(moviesAmount + 3);
    } else if (707 < window.innerWidth && window.innerWidth < 1140) {
      setMoviesAmount(moviesAmount + 2);
    } else if (window.innerWidth < 708) {
      setMoviesAmount(moviesAmount + 1);
    }
  }

  const num = moviesAmount / movies.length;

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", () => {
        handleMovieAmount();
      });
    }, 3000);
  });

  return (
    <>
      <Header openBurger={openBurger} />
      <main className="main">
        <section className="saved-movies">
          <SearchForm
            movies={movies}
            onFindMovie={onFindMovie}
            onShortMovies={onShortMovies}
          />
          <MoviesCardList
            movies={movies}
            handleDeleteMovie={handleDeleteMovie}
            moviesAmount={moviesAmount}
          />
          <button
            className={
              num < 1
                ? "movies__button-more movies__button-more_type_active"
                : "movies__button-more"
            }
            onClick={addMovies}
          >
            Ещё
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
}
