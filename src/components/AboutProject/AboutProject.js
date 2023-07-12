import React from "react";

function AboutProject() {
    return (
        <section className="about-project">
          <div className="title">
            <h2 className="title__text">О проекте</h2>
          </div>
          <div className="discription">
            <div className="discription__cell">
              <h3 className="discription__cell-title">Дипломный проект включал 5 этапов</h3>
              <p className="discription__cell-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div className="discription__cell">
              <h3 className="discription__cell-title">На выполнение диплома ушло 5 недель</h3>
              <p className="discription__cell-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
          </div>
        </section>
    )
}

export default AboutProject;