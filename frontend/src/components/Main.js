import React from 'react';
import editProfile from '../image/Vector.svg';
import icon from '../image/vectorAva.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);



  return (
    <main className="main-index">
      <section className="profile">
        <div className="profile__flex-wrapper">
          <div className="profile__avatar-container" onClick={props.onEditAvatar}>
            <div className="profile__avatar-vector">
              <img src={icon} alt="Иконка" />
            </div>
            <img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar" />
          </div>
          <div>
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__button-edit" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}>
                <img src={editProfile} alt="Иконка" className="profile__vector" />
              </button>
            </div>
            <p className="profile__specialization">{currentUser.about} </p>
          </div>
        </div>
        <button className="profile__button-new-card" type="button" aria-label="Добавить новую карточку" onClick={props.onAddPlace} />
      </section>
      <section className="grid-container" aria-label="Блок с карточками">
        <ul className="cards">
          {props.cards.map((card) => (
            <Card key={card['_id']}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />)
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;