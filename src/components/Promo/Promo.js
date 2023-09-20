import React from "react";
import NavTab from "../NavTab/NavTab";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__landing">
        <div className="promo__landing-text-wrapper">
          <h1 className="promo__landing-text">
            Учебный проект студента факультета Веб-разработки.
          </h1>
        </div>
        <NavTab />
      </div>
    </section>
  );
}

export default Promo;
