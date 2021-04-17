import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard(
      props.card.el
    )
  }
  return (
    <PopupWithForm className="popup popup_type_card-delete"
      name="card-delete"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit} />
  )
}

export default DeleteCardPopup;