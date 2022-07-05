import React from "react";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import { screen } from '@testing-library/react'
import App from "../App";
import Ranking from "../pages/Ranking";
import userEvent from "@testing-library/user-event";

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

describe('Testando tela de Ranking', () => {

  it('18. Verifique se esse botão deve enviar a pessoa para o início', () =>{
    const {history} = renderWithRouterAndRedux(<App />, INITIAL_STATE,  "/Ranking");

    const btnLoginRanking = screen.getByRole('button', {name: /Login/i});
    userEvent.click(btnLoginRanking);
    expect(history.location.pathname).toBe('/');
  })
  it('18. Verifique se esse botão deve possuir o atributo data-testid com o valor btn-go-home', () =>{
  renderWithRouterAndRedux(<Ranking /> , {exampleReducer: INITIAL_STATE});
  const btnGoHome = screen.getByTestId('btn-go-home');
  expect(btnGoHome).toBeInTheDocument();
  })
  // it('19. Será validado se existe uma pessoa no ranking', () =>{
  //   renderWithRouterAndRedux(<Ranking /> , {exampleReducer: INITIAL_STATE});
  //   const nameRanking =  screen.getByTestId('player-name-${index}');
  //   expect(nameRanking).toBeInTheDocument();  
  // })
  // it('19. Será validado se existem duas pessoas no ranking', () =>{
  //   renderWithRouterAndRedux(<Ranking /> , {exampleReducer: INITIAL_STATE});
  //   const twoPeopleRanking =  screen.getByTestId('player-score-${index}');
  //   expect(twoPeopleRanking).toHaveBeenCalled();  
  // })

});