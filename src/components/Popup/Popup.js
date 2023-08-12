import React from "react";

export default function Popup({ isOpen, popupMessage, onClose }) {
  return (
    <div className={`popup ` + (isOpen ? "popup_active" : "")}>
      <div className="popup-container">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <p className="popup__message">{popupMessage}</p>
      </div>
    </div>
  );
}
