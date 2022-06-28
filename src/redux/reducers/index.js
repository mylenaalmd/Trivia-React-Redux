import { combineReducers } from 'redux';
import {
  SAVE_EMAIL,
  SAVE_NAME,
  SAVE_ASSERTIONS,
  SAVE_SCORE,
  LOGIN,
} from '../actions';

// const INITIAL_STATE = {
//   name: nomeDaPessoa,
//   assertions: numeroDeAcertos,
//   score: pontuacao,
//   gravatarEmail: emailDaPessoa,
// };
const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const exampleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_NAME:
    return {
      ...state,
      name: action.payload,
    };
  case SAVE_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  case SAVE_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload,
    };
  case SAVE_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case LOGIN:
    return {
      ...state,
      gravatarEmail: action.payload,
      name: action.payload,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ exampleReducer });

export default rootReducer;
