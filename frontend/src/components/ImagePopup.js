import React from 'react';





function ImagePopup(props) {

  function onClose() {
    setTimeout(props.onClose, 700);
  }

  return (
    <div className={`popup popup_type_image ${props.card.isOpen ? 'popup_show' : ''}`}>
      <div className={`popup__body popup__body_modal_image ${props.card.isOpen ? 'popup__body_slice' : ''}`}>
        <figure className="popup__image">
          <img src={`${props.card.isOpen ? props.card.el.link : "link"}`} alt={`${props.card.isOpen ? props.card.el.name : ""}`} className="popup__card-image" />
          <figcaption className="popup__sign">{`${props.card.isOpen ? props.card.el.name : "link"}`}</figcaption>
        </figure>
        <button onClick={onClose} type="button" className="popup__button-close popup__button-close_modal_image"
          aria-label="кнопка Закрыть" />
      </div>
    </div>
  );
}

export default ImagePopup;