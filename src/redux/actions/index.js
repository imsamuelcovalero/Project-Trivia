// Coloque aqui suas actions
// const CURRENCI_API = 'https://economia.awesomeapi.com.br/json/all';

export const SET_USER_LOGIN = 'SET_USER_LOGIN';
export const SET_USER_PICTURE = 'SET_USER_PICTURE';
export const SET_USER_TOKEN = 'SET_USER_TOKEN';

export const setUserLogin = (payload) => ({
  type: SET_USER_LOGIN,
  payload,
});

export function setUserPicture(payload) {
  return {
    type: SET_USER_PICTURE,
    payload,
  };
}
export const setUserToken = (payload) => ({
  type: SET_USER_TOKEN,
  payload,
});
