import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function Movies({ movies, openBurger, onFindMovie, onShortMovies }) {

  return (
      <>
        <Header openBurger={openBurger} />
        <main className="main">
          <section className="movies">
            <SearchForm
            onFindMovie={onFindMovie}
            onShortMovies={onShortMovies}
            />
            <MoviesCardList movies={movies} />
            <button className="movies__button-more">Ещё</button>
          </section>
        </main>
        <Footer />
      </>
      
    
  )
}