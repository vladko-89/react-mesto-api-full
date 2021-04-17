import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import logo from '../image/logo.svg';

function Header(props) {
  return (
    <header className={`header ${props.isOpen ? 'header__flex' : ''}`}>
      <img src={logo} alt="Логотип Mesto Russia" className="logo" />
      <Switch>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">Войти</Link>
        </Route>
        <Route path="/">
          <div className={`header__flex-container ${props.isOpen ? '' : 'header__flex-container_close'}`}>
            <p className="header__email">{props.email}</p>
            <button className="header__button" onClick={props.onSignOut}>Выйти</button>
          </div>
          <div className={`header__burger header__burger_show ${props.isOpen ? 'header__burger_opened' : ''}`} onClick={props.onButtonBurgerClick}></div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;