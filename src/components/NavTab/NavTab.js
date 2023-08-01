import React from "react";

function NavTab() {
    return (
      <section className="nav-tab">
        <nav className="nav-tab__links">
          <a className="nav-tab__link" href="#about-project"><button className="nav-tab__button">О проекте</button></a>
          <a className="nav-tab__link" href="#techs"><button className="nav-tab__button">Технологии</button></a>
          <a className="nav-tab__link" href="#about-me"><button className="nav-tab__button">Студент</button></a>
        </nav>
      </section>
    )
}

export default NavTab;