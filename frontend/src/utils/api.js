class Api {
  constructor() {
    this._base = 'http://localhost:3000/';
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._base}users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  editUserInfo(data) {
    return fetch(`${this._base}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._checkResponse)
  }

  updateAvatar(link) {
    return fetch(`${this._base}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link,
      })
    })
      .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._base}cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(this._checkResponse)
  }

  addNewCard(data) {
    return fetch(`${this._base}cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkResponse)
  }

  deleteCard(cardID) {
    return fetch(`${this._base}cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  putLike(cardID) {
    return fetch(`${this._base}cards/${cardID}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  deleteLike(cardID, status) {
    if (status) {
      return fetch(`${this._base}cards/${cardID}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-type': 'application/json'
        }
      })
        .then(this._checkResponse)
    }
  }

  changeLikeCardStatus(cardID, status) {
    if (status) {
      return fetch(`${this._base}cards/${cardID}/likes`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-type': 'application/json'
        }
      })
        .then(this._checkResponse)
    }
    else {
      return fetch(`${this._base}cards/${cardID}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-type': 'application/json'
        }
      })
        .then(this._checkResponse)
    }
  }
}

const api = new Api();

export default api;