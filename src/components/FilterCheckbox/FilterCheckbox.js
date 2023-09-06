import React from "react";

export default function FilterCheckbox({ checkboxState, onSortMovies }) {

  return (
    <div className="checkbox">
      <div
        className={
          !checkboxState
            ? "filter-checkbox-icon"
            : "filter-checkbox-icon filter-checkbox-icon_active"
        }
      ></div>
      <input
        id="checkbox"
        type="checkbox"
        className="filter-checkbox"
        onClick={onSortMovies}
      />
    </div>
  );
}
