import { combineReducers } from 'redux';
import {
  SAVE_EMAIL,
  SAVE_NAME,
  SAVE_ASSERTIONS,
  SAVE_SCORE,
  LOGIN,
  RESET_GAME,
} from '../actions';

// const INITIAL_STATE = {
//   name: nomeDaPessoa,
//   assertions: numeroDeAcertos,
//   score: pontuacao,
//   gravatarEmail: emailDaPessoa,
// };
const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
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
      assertions: state.assertions + 1,
    };
  case SAVE_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case LOGIN:
    return {
      ...state,
      ...action.payload,
    };
  case RESET_GAME:
    return {
      ...state,
      assertions: 0,
      score: 0,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ player });

export default rootReducer;
