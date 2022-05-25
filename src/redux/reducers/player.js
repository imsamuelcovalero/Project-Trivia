// Lembre-se sempre de criar um estado inicial para cada reducer. É o mesmo que fazíamos com o this.state lá no constructor...
import { SET_USER_LOGIN, SET_USER_PICTURE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  email: '',
  picture: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_LOGIN:
    return { ...state, ...action.payload };
  case SET_USER_PICTURE:
    console.log('action.payload', action.payload);
    return { ...state, picture: action.payload };
  default:
    return state;
  }
};

export default playerReducer;
