import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function Movies({ cards }) {

  return (
    <section className="movies">
      <Header />
      <SearchForm />
      <MoviesCardList cards={cards.slice()} />
      <button className="movies__button-more">Ещё</button>
      <Footer />
    </section>
  )
}