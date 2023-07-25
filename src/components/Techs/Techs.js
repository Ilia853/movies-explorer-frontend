import React from "react";

export default function Techs() {
    return (
      <section className="techs" id="techs">
        <div className="title title_type_techs">
          <h2 className="title__text">Технологии</h2>
        </div>
        <div className="promo__landing-text-wrapper promo__landing-text-wrapper_type_techs">
          <h1 className="promo__landing-text promo__landing-text_type_techs">7 технологий</h1>
          <p className="techs-discription">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        </div>
        <section className="nav-tab_type_techs">
          <button className="nav-tab__button nav-tab__button_type_techs">HTML</button>
          <button className="nav-tab__button nav-tab__button_type_techs">CSS</button>
          <button className="nav-tab__button nav-tab__button_type_techs">JS</button>
          <button className="nav-tab__button nav-tab__button_type_techs">React</button>
          <button className="nav-tab__button nav-tab__button_type_techs">Git</button>
          <button className="nav-tab__button nav-tab__button_type_techs">Express.js</button>
          <button className="nav-tab__button nav-tab__button_type_techs">mongoDB</button>
        </section>
      </section>
    )
}