import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');


  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link
    });
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm className="popup popup_type_new-card"
      name="new-card"
      title="Новое место"
      buttonText='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>

      <ul className="popup__list">
        <li className="popup__item">
          <input className="popup__input popup__input_item_title" type="text" name="name" id="input_title" required
            placeholder="Название" minLength="2" maxLength="30"
            value={name} onChange={handleChangeName} />
          <span className="popup__error" id="input_title-error">ERROR</span>
        </li>
        <li className="popup__item">
          <input className="popup__input popup__input_item_path" type="url" id="input_link" name="link" required
            placeholder="Ссылка на картинку"
            value={link} onChange={handleChangeLink} />
          <span className="popup__error" id="input_link-error"></span>
        </li>
      </ul>
    </PopupWithForm>
  )
}

export default AddPlacePopup;