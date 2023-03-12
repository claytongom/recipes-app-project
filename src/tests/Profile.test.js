import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Profile from '../pages/Profile';
import renderWithRouterAndContextProvider from './helpers/renderWithRouterAndContextProvider';
import getTitleAndButton from '../helpers/getTitleAndButton';

jest.mock('../helpers/getTitleAndButton');

describe('Testanto a página "Profile"', () => {
  afterEach(() => {
    localStorage.clear();
  });

  beforeEach(() => {
    getTitleAndButton.mockReturnValue({
      title: 'Meals',
      haveButton: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Verifica se possui um elemento para e-mail.', () => {
    renderWithRouterAndContextProvider(<Profile />);
    const emailElement = screen.getByTestId('profile-email');
    expect(emailElement).toBeInTheDocument();
  });

  test('Verifica se os botões "Done Recipes" "Favorite Recipes" e o "Logout" são renderizados.', () => {
    renderWithRouterAndContextProvider(<Profile />);
    const doneRecipesBtn = screen.getByRole('button', {
      name: /done recipes/i,
    });
    const favoriteRecipesBtn = screen.getByRole('button', {
      name: /favorite recipes/i,
    });
    const logoutBtn = screen.getByRole('button', { name: /logout/i });

    expect(doneRecipesBtn).toBeInTheDocument();
    expect(favoriteRecipesBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  test('Verifica se o elemento de e-mail recebe o e-mail armazenado no LocalStorage.', () => {
    // Constantes para colocar no LocalStorage
    const testEmail = 'teste@teste.email';
    const testUser = { email: testEmail };

    // Setando o LocalStorage
    localStorage.setItem('user', JSON.stringify(testUser));
    renderWithRouterAndContextProvider(<Profile />);

    // Buscando o Elemento E-mail
    const emailElement = screen.getByTestId('profile-email');

    // Testando o Elemento E-mail
    expect(emailElement).toHaveTextContent(testEmail);
  });

  test('Verifica se o botão "Done Recipes" muda para a página Done Recipes.', async () => {
    const { history } = renderWithRouterAndContextProvider(<Profile />);

    // Buscando o botão "Done Recipes"
    const doneRecipesBtn = screen.getByRole('button', {
      name: /done recipes/i,
    });

    // Interagindo com o botão
    act(() => {
      userEvent.click(doneRecipesBtn);
    });

    // Verificando se foi para a página Done Recipes.
    await waitFor(
      () => expect(screen.getByRole('button', { name: /done recipes/i })).not
        .toBeInTheDocument,
    );
    const { pathname } = history.location;
    expect(pathname).toMatch(/done-recipes/);
  });

  test('Verifica se o botão "Favorite Recipes" muda para a página Favorite Recipes.', async () => {
    const { history } = renderWithRouterAndContextProvider(<Profile />);

    // Buscando o botão "Favorite Recipes"
    const favoriteRecipesBtn = screen.getByRole('button', {
      name: /favorite recipes/i,
    });

    // Interagindo com o botão
    act(() => {
      userEvent.click(favoriteRecipesBtn);
    });

    // Verificando se foi para a página Favorite Recipes.
    await waitFor(
      () => expect(screen.getByRole('button', { name: /favorite recipes/i })).not
        .toBeInTheDocument,
    );
    const { pathname } = history.location;
    expect(pathname).toMatch(/favorite-recipes/);
  });

  test('Verifica se o botão "Logout" limpa o LocalStorage e muda para a página Login.', async () => {
    // Constantes para colocar no LocalStorage
    const testEmail = 'teste@teste.email';
    const testUser = { email: testEmail };

    // Setando o LocalStorage
    localStorage.setItem('user', JSON.stringify(testUser));
    const { history } = renderWithRouterAndContextProvider(<Profile />);

    expect(localStorage.getItem('user')).toBeTruthy();

    // Buscando o botão "Logout"
    const logoutBtn = screen.getByRole('button', { name: /logout/i });

    // Interagindo com o botão
    act(() => {
      userEvent.click(logoutBtn);
    });

    // Verificando se foi para a página Login.
    await waitFor(
      () => expect(screen.getByRole('button', { name: /logout/i })).not
        .toBeInTheDocument,
    );
    const { pathname } = history.location;
    expect(pathname).toBe('/');

    // Verificando se o LocalStorage foi limpo
    expect(localStorage.getItem('user')).toBeFalsy();
  });
});
