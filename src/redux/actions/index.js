// Coloque aqui suas actions
// const CURRENCI_API = 'https://economia.awesomeapi.com.br/json/all';
import getToken from '../../helpers/getToken';
import setUserToken from '../../helpers/saveToken';

export const SET_USER_LOGIN = 'SET_USER_LOGIN';
export const SET_USER_PICTURE = 'SET_USER_PICTURE';
const FAIL_REQUEST = 'FAIL_REQUEST';
export const SET_USER_SCORE = 'SET_USER_SCORE';
export const SET_USER_ASSERTIONS = 'SET_USER_ASSERTIONS';

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

const failRequest = (payload) => ({
  type: FAIL_REQUEST,
  payload,
});

export const addUserThunk = (payload) => async (dispatch) => {
  try {
    const { token } = await getToken();
    setUserToken(token);
    dispatch(setUserLogin(payload));
  } catch (err) {
    return dispatch(failRequest(err.message));
  }
};

export function saveUserScore(payload) {
  return {
    type: SET_USER_SCORE,
    payload,
  };
}

export function saveUserAssertion(payload) {
  return {
    type: SET_USER_ASSERTIONS,
    payload,
  };
}
