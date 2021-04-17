import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const avatarLink = React.useRef();


  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarLink.current.value,
    });
    avatarLink.current.value = '';
  }

  return (
    <PopupWithForm className="popup popup_type_avatar"
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>

      <ul className="popup__list">
        <li className="popup__item">
          <input className="popup__input popup__input_item_path" type="url" id="input_avatar" name="link" required
            placeholder="Ссылка аватара"
            ref={avatarLink} />
          <span className="popup__error" id="input_avatar-error"></span>
        </li>
      </ul>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;