import React from "react";
import { screen, waitFor } from "@testing-library/react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import Game from "../pages/Game";
import { data, gravatar0, initialState, invalidInitialState, storageData } from "./mocks/GameMocks";
import App from "../App";

const mockFetch = () => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    })
  );
};

const queryButtonNext = () => screen.queryByTestId("btn-next");
const queryCorrectAnswer = async () => await screen.queryAllByTestId("correct-answer");
const queryLoading = () => screen.queryByTestId('loading');

const getCorrectAnswer = () => screen.getByTestId("correct-answer");
const getCategory = () => screen.getByTestId("question-category");
const getQuestionText = () => screen.getByTestId("question-text");
const getScore = () => screen.getByTestId("header-score");
const getWrongAnswer1 = () => screen.getByTestId("wrong-answer-0");
const getWrongAnswer2 = () => screen.getByTestId("wrong-answer-1");
const getWrongAnswer3 = () => screen.getByTestId("wrong-answer-2");
const getProfile = () => screen.getByTestId("header-profile-picture");
const getPlayerName = () => screen.getByTestId("header-player-name");
const getAnswerOptions = () => screen.getByTestId("answer-options");
const getTimer = () => screen.getByTestId('timer');
const getLoading = () => screen.getByTestId('loading');


describe("Pagina do jogo", () => {
  beforeEach(mockFetch);
  afterEach(() => jest.clearAllMocks());

  it('Testa se aparece carregando antes das requisições completarem, e depois verifica a renderização', async () => {
    renderWithRouterAndRedux(<Game />, initialState);
    expect(getLoading()).toBeInTheDocument()
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(queryLoading()).not.toBeInTheDocument()
  })

  it('Testando se a pagina é renderizada corretamente', async () => {
    renderWithRouterAndRedux(<Game />, initialState);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(getQuestionText()).toBeInTheDocument()
    expect(getQuestionText()).toBeInTheDocument()
    expect(getCategory()).toBeInTheDocument()
    expect(getQuestionText()).toBeInTheDocument()
    expect(getScore()).toBeInTheDocument()
    expect(getCorrectAnswer()).toBeInTheDocument()
    expect(getWrongAnswer1()).toBeInTheDocument()
    expect(getWrongAnswer2()).toBeInTheDocument()
    expect(getWrongAnswer3()).toBeInTheDocument()
    expect(getProfile()).toBeInTheDocument()
    expect(getProfile()).toHaveAttribute('src', gravatar0)
    expect(getPlayerName()).toBeInTheDocument()
    expect(getAnswerOptions()).toBeInTheDocument()
  });

  it('Testando exibição das questões', async () => {
    renderWithRouterAndRedux(<Game />, initialState);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(await queryCorrectAnswer()).toHaveLength(1);
    expect(queryButtonNext()).toBe(null);
    expect(getQuestionText()).toHaveTextContent(data.results[0].question);
    expect(getCategory()).toHaveTextContent(data.results[0].category);
    expect(queryButtonNext()).toBeDefined();
  });

  it('Testando se ao clicar em uma resposta o botão next aparece', async () => {
    renderWithRouterAndRedux(<Game />, initialState);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    global.localStorage.setItem('ranking', JSON.stringify(storageData));
     userEvent.click(getCorrectAnswer());
     expect(queryButtonNext()).toBeDefined();
  });

  it('Testando se ao clicar no botão next, novas questões aparecem', async () => {
    renderWithRouterAndRedux(<Game />, initialState);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    global.localStorage.setItem('ranking', JSON.stringify(storageData));
     userEvent.click(getCorrectAnswer());
     expect(queryButtonNext()).toBeDefined();
     userEvent.click(queryButtonNext());
     expect(getCategory()).toHaveTextContent(data.results[1].category);
     expect(getQuestionText()).toHaveTextContent(data.results[1].question);
  });

  it('Testando se o score está funcionando corretamente', async () => {
    renderWithRouterAndRedux(<Game />, initialState);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    global.localStorage.setItem('ranking', JSON.stringify(storageData));
    expect(getScore()).toHaveTextContent('0');
    userEvent.click(getCorrectAnswer());
    expect(getScore()).toHaveTextContent('70');
    userEvent.click(queryButtonNext());
    userEvent.click(getCorrectAnswer());
    expect(getScore()).toHaveTextContent('170');
    userEvent.click(queryButtonNext());
    userEvent.click(getCorrectAnswer());
    expect(getScore()).toHaveTextContent('240');
    userEvent.click(queryButtonNext());
    userEvent.click(getWrongAnswer1());
    expect(getScore()).toHaveTextContent('240');
  });

  it('Testa o timer', async () => {
    renderWithRouterAndRedux(<Game />, initialState);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    global.localStorage.setItem('ranking', JSON.stringify(storageData));
    await waitFor(() => expect(getTimer()).toHaveTextContent('26'), {timeout: 4500});
  })

  it('Testando o redirecionamento de usuário invalido', async () => {
    const { history } = renderWithRouterAndRedux(<App />, invalidInitialState);
    history.push('/game');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    waitFor(() => expect(history.location.pathname).toBe('/') );
  });

});
