export const SAVE_NAME = 'SAVE_NAME';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_ASSERTIONS = 'SAVE_ASSERTIONS';
export const SAVE_SCORE = 'SAVE_SCORE';
export const LOGIN = 'LOGIN';

export const saveName = (name) => ({
  type: SAVE_NAME,
  payload: name,
});

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});
export const saveAssertions = () => ({
  type: SAVE_ASSERTIONS,
  // payload: assertions,
});
export const saveScore = (score) => ({
  type: SAVE_SCORE,
  payload: score,
});

export const login = (name, gravatarEmail) => ({
  type: LOGIN,
  payload: {
    name,
    gravatarEmail,
  },
});
