export const BASE_URL = 'http://localhost:3000';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      else {
        return Promise.reject(`Что-то пошло не так: ${response.status}`);
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};
export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      else {
        return Promise.reject(`Что-то пошло не так: ${response.status}`);
      }
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);

        return data;
      }
    })
    .catch(err => console.log(err))
};
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(res => res.json())
    .then(data => data)
}