import React from 'react';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import App from '../../App';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const initialState = {
  player: {
    name: '',
    email: '',
  },
};

describe('Cobertura de testes da tela de Login', () => {
  afterEach(() => jest.clearAllMocks());

  test('Verifica se os campos de input são renderizados corretamente', () => {
    renderWithRouterAndRedux(<App />, initialState, '/');

    const inputName = screen.getByPlaceholderText('Name');
    const inputEmail = screen.getByPlaceholderText('E-mail');

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
  });

  test("Verifica se ao digitar nos campos de input o botão 'Play' é habilitado", () => {
    renderWithRouterAndRedux(<App />, initialState, '/');

    const inputName = screen.getByPlaceholderText('Name');
    const inputEmail = screen.getByPlaceholderText('E-mail');
    const buttonPlay = screen.getByRole('button', { name: 'Play' });

    expect(buttonPlay).toBeDisabled();

    userEvent.type(inputName, 'Tryber');
    userEvent.type(inputEmail, 'trybe@test.com');

    expect(buttonPlay).toBeEnabled();
  });

  test("Verifica se ao clicar no botão 'Play' o usuário é redirecionado para a página do jogo", async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/');

    const inputName = screen.getByPlaceholderText('Name');
    const inputEmail = screen.getByPlaceholderText('E-mail');
    const buttonPlay = screen.getByRole('button', { name: 'Play' });

    userEvent.type(inputName, 'Tryber');
    userEvent.type(inputEmail, 'trybe@test.com');
    userEvent.click(buttonPlay);

    await waitFor(() => expect(history.location.pathname).toBe('/game'));
  });

  test("Verifica se ao clicar no botão 'Settings' o usuário é redirecionado para a página de configurações", async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/');

    const inputName = screen.getByPlaceholderText('Name');
    const inputEmail = screen.getByPlaceholderText('E-mail');
    const buttonSettings = screen.getByRole('button', { name: 'Settings' });

    userEvent.type(inputName, 'Tryber');
    userEvent.type(inputEmail, 'trybe@test.com');
    userEvent.click(buttonSettings);

    await waitFor(() => expect(history.location.pathname).toBe('/settings'));
  });

  test("Verifica se ao clicar no botão 'Play' é feita uma requisição a API", async () => {
    const url = 'https://opentdb.com/api_token.php?command=request';

    const tokenData = {
      response_code: 0,
      response_message: 'Token Generated Successfully!',
      token: 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6',
    };

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(tokenData),
    });

    renderWithRouterAndRedux(<App />, initialState, '/');

    const inputName = screen.getByPlaceholderText('Name');
    const inputEmail = screen.getByPlaceholderText('E-mail');
    const buttonPlay = screen.getByRole('button', { name: 'Play' });

    userEvent.type(inputName, 'Tryber');
    userEvent.type(inputEmail, 'trybe@test.com');
    userEvent.click(buttonPlay);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(url);
    });
  });

  test('Verifica se o token recebido da API é salvo no localStorage', () => {
    const tokenData = {
      response_code: 0,
      response_message: 'Token Generated Successfully!',
      token: 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6',
    };

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(tokenData),
    });

    renderWithRouterAndRedux(<App />, initialState, '/');

    const inputName = screen.getByPlaceholderText('Name');
    const inputEmail = screen.getByPlaceholderText('E-mail');
    const buttonPlay = screen.getByRole('button', { name: 'Play' });

    userEvent.type(inputName, 'Tryber');
    userEvent.type(inputEmail, 'trybe@test.com');
    userEvent.click(buttonPlay);

    const localStorageItem = localStorage.getItem('token');
    expect(localStorageItem).toBe(tokenData.token);
  });
});
