import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndContextProvider from './helpers/renderWithRouterAndContextProvider';
import App from '../App';

describe.only('Testes da página de login', () => {
  afterEach(() => {
    localStorage.clear();
  });

  const testEmail = 'teste@teste.email';
  const testUser = { email: testEmail };

  test('Teste de todos os inputs', async () => {
    renderWithRouterAndContextProvider(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPsw = screen.getByTestId('password-input');
    const btn = screen.getByTestId('login-submit-btn');
    expect(inputEmail).toBeInTheDocument();
    expect(inputPsw).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPsw, '123456789');
    await waitFor(() => expect(btn).toBeEnabled);
    act(() => {
      userEvent.click(btn);
    });
    localStorage.setItem('user', JSON.stringify(testUser));
    expect(localStorage.getItem('user')).toBeTruthy();
  });
});
