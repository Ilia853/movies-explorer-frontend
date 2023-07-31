import React from "react";

function NavTab() {
    return (
      <section className="nav-tab">
        <nav className="nav-tab__links">
          <a className="nav-tab__link" href="#about-project"><p className="nav-tab__button">О проекте</p></a>
          <a className="nav-tab__link" href="#techs"><p className="nav-tab__button">Технологии</p></a>
          <a className="nav-tab__link" href="#about-me"><p className="nav-tab__button">Студент</p></a>
        </nav>
      </section>
    )
}

export default NavTab;