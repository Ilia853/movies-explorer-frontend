import React from "react";

const Preloader = ({ switchPreloader }) => {
  return (
    <div
      className={`preloader` + (!switchPreloader ? " preloader_disabled" : "")}
    >
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
};

export default Preloader;
