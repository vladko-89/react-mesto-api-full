import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }


  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      className="popup popup_type_profile"
      name="profile" title="Редактировать профиль"
      buttonText="Сохранить"
      onSubmit={handleSubmit}>

      <ul className="popup__list">
        <li className="popup__item">
          <input className="popup__input popup__input_item_name"
            id="input_name"
            type="text"
            name="user" required
            placeholder="Ваше имя" minLength="2" maxLength="40"
            value={name} onChange={handleChangeName} />
          <span className="popup__error" id="input_name-error"></span>
        </li>
        <li className="popup__item">
          <input className="popup__input popup__input_item_specialization"
            type="text" name="specialization"
            id="input_pass" required placeholder="Профессия" minLength="2" maxLength="200"
            value={description} onChange={handleChangeDescription} />
          <span className="popup__error" id="input_pass-error"></span>
        </li>
      </ul>
    </PopupWithForm>
  )
}

export default EditProfilePopup;