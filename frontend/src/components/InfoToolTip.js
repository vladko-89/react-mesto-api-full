import React from 'react';
import error from '../image/popup_error.svg';
import ok from '../image/popup_ok.svg';

function InfoToolTip(props) {
  return (
    <div className={`popup popup_type_register ${props.isOpen ? 'popup_show' : ''}`}>
      <div className={`popup__body popup__body_modal_register ${props.isOpen ? 'popup__body_slice' : ''}`}>
        <div className="popup__container">
          <img className="popup__icon" src={props.status ? ok : error} alt={`${props.status ? "Вы зарегистрированы" : "Ошибка. Что-то не так"}`} ></img>
        </div>
        <p className="popup__text">{props.text}</p>
        <button onClick={props.onClose} type="button" className="popup__button-close popup__button-close_modal_register"
          aria-label="кнопка Закрыть" />
      </div>
    </div>
  );
}

export default InfoToolTip;