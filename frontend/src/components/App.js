import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api.js';



function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [email, setEmail] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [textInfoToolTip, setTextInfoToolTip] = React.useState('');
  const [statusInfoToolTip, setStatusInfoToolTip] = React.useState(false);
  const [buttonBurger, setButtonBurger] = React.useState(false);
  const history = useHistory();

  //Начальная проверка пользователя
  React.useEffect(() => {
    checkLogin();
  }, [])

  //Получили данные пользователя
  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn])

  //Получили карточки
  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then((res) => {
          res.reverse();
          setCards(res);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn])



  //Ставим/снимаем лайки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    console.log(card);
    api.deleteCard(card._id).then((res) => {
      const newCards = cards.filter((newCard) => {
        return card._id !== newCard._id;
      })
      setCards(newCards);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardClick(card) {
    setSelectedCard({ ...selectedCard, isOpen: true, el: card });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectedCard({ ...selectedCard, isOpen: false, el: card });
  }

  //Закрываем модальные окна
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard({ ...selectedCard, isOpen: false })
  }

  //Обновили данные пользователя
  function handleUpdateUser(newData) {
    api.editUserInfo(newData)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //Изменили аватар
  function handleUpdateAvatar(link) {
    api.updateAvatar(link.avatar)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Добавили карточку
  function handleAddCard(data) {
    api.addNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        console.log(res)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // 12 СПРИНТ

  function handleLogin(data) {
    auth.login(data.email, data.password)
      .then((newData) => {
        if (newData.token) {
          setEmail(data.email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleRegister(data) {
    if (data.email !== '' && data.password !== '') {
      auth.register(data.email, data.password).then((res) => {
        if (res.statusCode !== 400) {
          history.push('/sign-in');
          setStatusInfoToolTip(true);
          setTextInfoToolTip('Вы успешно зарегестрировались!');
        }
      })
        .catch((err) => {
          console.log(err);
          setStatusInfoToolTip(false);
          setTextInfoToolTip('Что-то пошло не так! Попробуйте ещё раз.');
        })
      handleInfoToolTipClick();
    }
    else {
      setStatusInfoToolTip(false);
      setTextInfoToolTip('Что-то пошло не так! Попробуйте ещё раз.');
      handleInfoToolTipClick();
    }
  }

  function checkLogin() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      console.log(jwt);
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.email);
          history.push('/');
        }
      })
        .catch((err) => {
          console.log(err);
        })
    }
  }
  // Обработчик события "Выйти из профиля"
  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setButtonBurger(false);
    history.push('/sign-in');
  }
  // Обработчик модального окна при регистрации
  function handleInfoToolTipClick() {
    setIsInfoToolTipOpen(true);
  }
  // Обработчик свернуть/развернуть бургер меню в мобильной версии
  function handleButtonBurgerClick() {
    if (!buttonBurger) {
      setButtonBurger(true);
    }
    else {
      setButtonBurger(false);
    }
  }





  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="container">

          <Header email={email} onSignOut={handleSignOut}
            isOpen={buttonBurger}
            onButtonBurgerClick={handleButtonBurgerClick} />
          <Switch>
            <Route path='/sign-in'>
              <Login signIn={handleLogin} />
            </Route>
            <Route path='/sign-up'>
              <Register registration={handleRegister} />
            </Route>
            <ProtectedRoute exact path='/'
              component={Main}
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick}
            />
          </Switch>
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddCard} />

          <DeleteCardPopup
            card={selectedCard}
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
          />

          <ImagePopup card={selectedCard}
            onClose={closeAllPopups} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />

          <InfoToolTip isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
            text={textInfoToolTip}
            status={statusInfoToolTip} />
        </div>
      </div>


    </CurrentUserContext.Provider>

  );
}

export default App;
