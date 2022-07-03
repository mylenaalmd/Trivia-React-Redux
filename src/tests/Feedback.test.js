import React from 'react'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Feedback from '../pages/Feedback'
import App from '../App'

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

describe('Testando pagina de Login', () => {
/*   beforeEach(() => {
    renderWithRouterAndRedux(<Feedback /> , {exampleReducer: INITIAL_STATE}); // o link de entrada está dando erro
  }); */
  it('12.O header de feedback deve conter as informações da pessoa jogadora', () => {
    renderWithRouterAndRedux(<Feedback /> , {exampleReducer: INITIAL_STATE});
    const profilePicture = screen.getByTestId('header-profile-picture');
    const playerName = screen.getByTestId('header-player-name');
    const score = screen.getByTestId('header-score');
    expect(profilePicture).toBeInTheDocument();
    expect(playerName).toBeInTheDocument();
    expect(score).toBeInTheDocument();
  })
  it('13.Verificar se possui mensagem para "Could be better..." abaixo de 3 acertos', () => {
    INITIAL_STATE.assertions = 2;
    renderWithRouterAndRedux(<Feedback /> , {exampleReducer: INITIAL_STATE});
    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toBeInTheDocument(); // quero um test que verifique se possui mensagem para "Could be better..." abaixo de 3
})
it('13.Verificar se possui mensagem para "Well Done!" acima de 3 acertos', () => {
  INITIAL_STATE.assertions = 4;
  renderWithRouterAndRedux(<Feedback /> , {exampleReducer: INITIAL_STATE});
  const feedbackText = screen.getByTestId('feedback-text');
  console.log(feedbackText.innerHTML);
  expect(feedbackText).toBeInTheDocument(); // quero um test que verifique se possui mensagem para "Well Done!" acima de 3
})
it('14.Verifica se exibe as informações dos resultados obtidos da pessoa usuária', () => {
  renderWithRouterAndRedux(<Feedback /> , {exampleReducer: INITIAL_STATE});
  const fbTotalScore = screen.getByTestId('feedback-total-score');
  const fbTotalQuestion = screen.getByTestId('feedback-total-question');
  expect(fbTotalScore).toBeInTheDocument();
  expect(fbTotalQuestion).toBeInTheDocument();
})
it('15. Verifique se há opção para a pessoa jogadora poder jogar novamente', () => {
  const { history } = renderWithRouterAndRedux(<App /> , INITIAL_STATE, "/feedback" );
  // renderWithRouterAndRedux(<Feedback /> , {exampleReducer: INITIAL_STATE});
  // const playAgain = screen.getByTestId('btn-play-again');
  // expect(playAgain).toBeInTheDocument();

  const playAgain = screen.getByRole('button', {name: /play again/i})
  userEvent.click(playAgain);
  expect(history.location.pathname).toBe('/');
})
it('16. Verifique se há opção para a pessoa jogadora poder visualizar a tela de ranking', () => {
  const { history } = renderWithRouterAndRedux(<App /> , INITIAL_STATE, "/feedback" );

  // const redirectRankingBtn = screen.getByTestId("btn-ranking")
  // expect(redirectRankingBtn).toBeInTheDocument();

  const redirectRankingBtn = screen.getByRole('button', {name: /ranking/i})
  userEvent.click(redirectRankingBtn);
  expect(history.location.pathname).toBe('/ranking');
})
})