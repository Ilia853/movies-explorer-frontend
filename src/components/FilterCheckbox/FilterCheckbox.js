import React from "react";

export default function FilterCheckbox({ onShortMovies }) {
  
  return (
    <div className="checkbox">
      <div className="filter-checkbox-icon"></div>
      <input id="checkbox" type="checkbox" className="filter-checkbox" onClick={onShortMovies} />
    </div>
  );
}
