import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.registration({
      email,
      password
    });
    setEmail('');
    setPassword('');
  }

  return (
    <form className="initial-form form initial-form_type_sign-in" noValidate action="http://echo.htmlacademy.ru" method="post"
      name="sign-in-form"
      onSubmit={handleSubmit}>
      <h2 className="initial-form__title">Регистрация</h2>
      <ul className="initial-form__list">
        <li className="initial-form__item">
          <input className="initial-form__input initial-form__input_item_email"
            id="input_email"
            type="email"
            name="email" required
            placeholder="Email" minLength="6" maxLength="40"
            onChange={handleChangeEmail}
            value={email} />
          <span className="initial-form__error" id="input_email-error"></span>
        </li>
        <li className="initial-form__item">
          <input className="initial-form__input initial-form__email_item_password"
            type="password" name="password"
            id="input_password" required placeholder="Пароль" minLength="2" maxLength="200"
            onChange={handleChangePassword}
            value={password} />
          <span className="initial-form__error" id="input_password-error"></span>
        </li>
      </ul>
      <button type="submit" className="initial-form__button-submit">Зарегистрироваться</button>
      <p className="initial-form__text">Уже зарегистрированы? <Link to="/sign-in" className="initial-form__link">Войти</Link></p>
    </form>
  )
}

export default Register;