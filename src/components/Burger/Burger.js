import React from "react";

export default function Burger({ isOpen, closeBurger }) {
  
  return (
    <section className="burger">
      <div className={"burger__blur" + (isOpen ? " burger__menu_active" : "")} />
      <div className={"burger__menu" + (isOpen ? " burger__menu_active" : "")}>
        <button className="burger__close-btn" onClick={closeBurger} ></button>
      </div>
    </section>
  )
}