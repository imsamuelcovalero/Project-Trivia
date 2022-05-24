// Lembre-se sempre de criar um estado inicial para cada reducer. É o mesmo que fazíamos com o this.state lá no constructor...
import { SET_USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  assertions: 0,
  score: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_LOGIN:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default userReducer;
