import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwner = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = `card__delete ${isOwner ? "" : "card__delete_hidden"}`;
  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = `card__like ${isLiked ? "card__like_active" : ""}`

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <li className="cards__item" key={props.card._id}>
      <article className="card">
        <img onClick={handleClick} src={props.card.link} className="card__image" alt={props.card.name} />
        <button className={cardDeleteButtonClassName} type="button" aria-label="Кнопка удалить"
          onClick={handleDeleteClick}></button>
        <div className="card__container">
          <h2 className="card__title">{props.card.name} </h2>
          <div className="card__likes-container">
            <button className={cardLikeButtonClassName} type="button" aria-label="Кнопка like" onClick={handleLikeClick} />
            <p className="card__likes-counter">{props.card.likes.length}</p>
          </div>
        </div>
      </article>
    </li>
  );
}

export default Card;