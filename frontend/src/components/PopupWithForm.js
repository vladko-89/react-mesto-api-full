import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_show' : false}`}>
      <div className={`popup__body popup__body_modal_${props.name} ${props.isOpen ? 'popup__body_slice' : false}`}>
        <form className="popup__profile form form_closed" noValidate action="http://echo.htmlacademy.ru" method="post"
          name={`${props.name}-form`}
          onSubmit={props.onSubmit}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button type="submit" className="popup__button-submit">{props.buttonText}</button>
        </form>
        <button onClick={props.onClose} type="button" className={`popup__button-close popup__button-close_modal_${props.name}`}
          aria-label="кнопка Закрыть" />
      </div>
    </div >
  );
}

export default PopupWithForm;