import React from "react";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__wrapper">
        <h2 className="portfolio__title">Портфолио</h2>
        <a
          className="portfolio__block"
          href="https://github.com/Ilia853/how-to-learn.git"
          target="blank"
        >
          <h3 className="portfolio__site">Статичный сайт</h3>
          <div className="portfolio__link">
            <img
              className="portfolio__link-img"
              src={require("../../images/portfolio__link-img.png")}
              alt="ссылка на проект"
            />
          </div>
        </a>
        <a
          className="portfolio__block"
          href="https://github.com/Ilia853/russian-travel.git"
          target="blank"
        >
          <h3 className="portfolio__site">Адаптивный сайт</h3>
          <div className="portfolio__link">
            <img
              className="portfolio__link-img"
              src={require("../../images/portfolio__link-img.png")}
              alt="ссылка на проект"
            />
          </div>
        </a>
        <a
          className="portfolio__block"
          href="https://github.com/Ilia853/react-mesto-api-full-gha.git"
          target="blank"
        >
          <h3 className="portfolio__site">Одностраничное приложение</h3>
          <div className="portfolio__link">
            <img
              className="portfolio__link-img"
              src={require("../../images/portfolio__link-img.png")}
              alt="ссылка на проект"
            />
          </div>
        </a>
      </div>
    </section>
  );
}
