import React from 'react'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App' 
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';


const getInputName = () => screen.getByTestId('input-player-name')

const getInputEmail = () => screen.getByTestId('input-gravatar-email')

const getBtnPlay = () => screen.getByTestId('btn-play')

const getBtnSettings = () => screen.getByTestId('btn-settings')


describe('Testando pagina de Login', () => {
    it('verificando se a tela de Login é renderizada corretamente', () => {
        renderWithRouterAndRedux(<App />);
        expect(getInputName()).toBeInTheDocument();
        expect(getInputEmail()).toBeInTheDocument();
        expect(getBtnPlay()).toBeInTheDocument();
        expect(getBtnSettings()).toBeInTheDocument();
        
    })
    it('botão desabilitado', () => {
        renderWithRouterAndRedux(<App />);
        userEvent.type(getInputName(), 'a');
        expect(getBtnPlay()).toBeDisabled();
      })
    it('botão desabilitado', () => {
        renderWithRouterAndRedux(<App />);
        userEvent.type(getInputEmail(), 'a');
        expect(getBtnPlay()).toBeDisabled();
    })
    it('botão habilitado', () => {
        renderWithRouterAndRedux(<App />);
        userEvent.type(getInputName(), 'a');
        userEvent.type(getInputEmail(), 'a');
        expect(getBtnPlay()).toBeEnabled();
    })
    it('testando ação de login', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({ 
            json: jest.fn().mockResolvedValue({
                "response_code": 0,
                "response_message": "Token Generated Successfully!",
                "token": "b410441eb3a6139e61b7745d604a3f55c8d79a15c93d5f52c10f10115e065b7a"
            })
        })

        renderWithRouterAndRedux(<App />);
        userEvent.type(getInputName(), 'a');
        userEvent.type(getInputEmail(), 'a');
        expect(getBtnPlay()).toBeEnabled();
        userEvent.click(getBtnPlay());
        expect(global.fetch).toHaveBeenCalled()
    })

    it('testando ação de configuracao', () => {
        
        const history = createMemoryHistory();
        renderWithRouterAndRedux(<App />);
    
        userEvent.click(getBtnSettings());
        history.push('/configuracao');
      });
})
