import React from "react";

function Footer() {
  return (
    <footer className="footer">
        <h3 className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className="footer__wrapper">
            <div className="footer__date">&#169; {new Date().getFullYear()}</div>
            <div className="footer__links">
                <a className="footer__praktikum" href="https://practicum.yandex.ru/" target="blank">Яндекс.Практикум</a>
                <a className="footer__github" href="https://github.com/" target="blank">Github</a>
            </div>
        </div>
    </footer>
  );
}

export default Footer;