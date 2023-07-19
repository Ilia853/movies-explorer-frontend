import React from "react";

export default function AboutMe() {
    return (
        <section className="about-me">
          <div className="title title__type_about-me">
            <h2 className="title__text">Студент</h2>
          </div>
          <div className="about-me__information">
            <div className="about-me__text">
              <h2 className="about-me__name">Илья</h2>
              <h3 className="about-me__job-age">Фронтенд-разработчик, 36 лет</h3>
              <p className="about-me__discription">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
                и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
              <a className="about-me__github" href="https://github.com/Ilia853" target="blank">Github</a>
            </div>
            <img className="about-me__photo" src={require("../../images/me.jpg")} alt="фото студента" />
          </div>
        </section>
        
    )
}