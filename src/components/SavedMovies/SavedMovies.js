import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function SavedMovies({ cards, openBurger }) {
  return (
    <section className="saved-movies">
      <Header openBurger={openBurger} />
      <SearchForm />
      <MoviesCardList cards={cards.slice(0, 3)} />
      <button className="movies__button-more movies__button-more_hidden">Ещё</button>
      <Footer />
    </section>
  )
}