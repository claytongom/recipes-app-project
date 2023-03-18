import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import renderWithRouterAndContextProvider from './helpers/renderWithRouterAndContextProvider';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

jest.mock('clipboard-copy');
jest.useFakeTimers();

const whiteHeartIcon = 'http://localhost/whiteHeartIcon.svg';
const endPoint = '/drinks/178319';
const endPointMeals = '/meals/52771';
describe('Teste da página Recipe Details', () => {
  beforeEach(async () => {
    global.fetch = jest.fn(fetch);
  });

  test('Verifica se as informações sobre a receita "Aquamarine" é renderizada na tela', async () => {
    const { history } = renderWithRouterAndContextProvider(<App />);
    act(() => {
      history.push(endPoint);
    });

    await waitFor(() => {
      expect(screen.getByText('Aquamarine')).toBeInTheDocument();
    });
    expect(screen.getByText('Ingredients')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Intructions')).toBeInTheDocument();
    expect(
      screen.getByRole('img', {
        name: /https:\/\/www\.thecocktaildb\.com\/images\/media\/drink\/zvsre31572902738\.jpg/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/alcoholic/i)).toBeInTheDocument();
  });

  test('Verifica se as informações de recomendações estão sendo renderizadas na tela', async () => {
    const { history } = renderWithRouterAndContextProvider(<App />);
    act(() => {
      history.push(endPoint);
    });

    await waitFor(() => {
      expect(screen.getByText(/corba/i)).toBeInTheDocument();
    });
    expect(screen.getByRole('img', { name: /corba/i })).toBeInTheDocument();
  });

  test('Verifica se os botões estão sendo renderizados na tela', async () => {
    const { history } = renderWithRouterAndContextProvider(<App />);
    act(() => {
      history.push(endPoint);
    });

    await waitFor(() => {
      expect(screen.getByText(/alcoholic/i)).toBeInTheDocument();
    });
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /share/i }));
  });

  test('Verifica se ao clicar no botão "Start Recipe" a rota é alterada', async () => {
    const { history } = renderWithRouterAndContextProvider(<App />);
    act(() => {
      history.push(endPoint);
    });

    await waitFor(() => {
      screen.getByRole('heading', { name: /aquamarine/i });
    });
    const startRecipeBTN = screen.getByRole('button', {
      name: /start recipe/i,
    });
    userEvent.click(startRecipeBTN);
    await waitFor(() => {
      screen.getByRole('heading', { name: /aquamarine/i });
    });

    expect(history.location.pathname).toBe('/drinks/178319/in-progress');
    expect(localStorage.getItem('inProgressRecipes')).toBeTruthy();
  });

  test('Verifica se ao clicar no botão "Start Recipe" agora é "Continue Recipe"', async () => {
    const { history } = renderWithRouterAndContextProvider(<App />);
    act(() => {
      history.push(endPoint);
    });

    await waitFor(() => {
      screen.getByRole('heading', { name: /aquamarine/i });
    });

    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        drinks: { 178319: [[Object], [Object], [Object]] },
        meals: {},
      }),
    );

    expect(
      screen.getByRole('button', { name: /continue recipe/i }),
    ).toBeInTheDocument();
  });

  test('testando o botão "share"', async () => {
    const { history } = renderWithRouterAndContextProvider(<App />);
    act(() => {
      history.push(endPoint);
    });

    await waitFor(() => {
      screen.getByRole('heading', { name: /aquamarine/i });
    });

    copy.mockImplementation(
      () => 'http://localhost:3000/drinks/178319/in-progress',
    );

    const btnShare = screen.getByRole('button', { name: /share/i });
    userEvent.click(btnShare);
    const copyElement = screen.getByText('Link copied!');
    expect(copyElement).toBeInTheDocument();
    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => {
      expect(copyElement).not.toBeInTheDocument();
    });
  });

  test('testando o botão "favorite" usando a rota de comidas', async () => {
    const { history } = renderWithRouterAndContextProvider(<App />);
    act(() => {
      history.push(endPointMeals);
    });

    await waitFor(() => {
      screen.getByRole('heading', { name: /Spicy Arrabiata Penne/i });
    });

    const btnFavorite = screen.getByRole('img', { name: /coração/i });
    expect(btnFavorite).toHaveProperty(
      'src',
      whiteHeartIcon,
    );
    act(() => {
      userEvent.click(btnFavorite);
    });
    expect(btnFavorite).not.toHaveProperty(
      'src',
      whiteHeartIcon,
    );
    const FavoriteLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(FavoriteLS[0].name).toBe('Spicy Arrabiata Penne');

    act(() => {
      userEvent.click(btnFavorite);
    });
    expect(btnFavorite).toHaveProperty(
      'src',
      whiteHeartIcon,
    );
  });

  test('testando o botão "favorite usando a rota de bebidas"', async () => {
    const { history } = renderWithRouterAndContextProvider(<App />);
    act(() => {
      history.push(endPoint);
    });
    await waitFor(() => {
      screen.getByText('Aquamarine');
    });

    const btnFavorite = screen.getByRole('img', { name: /coração/i });
    expect(btnFavorite).toHaveProperty(
      'src',
      whiteHeartIcon,
    );
    act(() => {
      userEvent.click(btnFavorite);
    });
    expect(btnFavorite).not.toHaveProperty(
      'src',
      whiteHeartIcon,
    );
    const FavoriteLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(FavoriteLS[0].name).toBe('Aquamarine');

    act(() => {
      userEvent.click(btnFavorite);
    });
    expect(btnFavorite).toHaveProperty(
      'src',
      whiteHeartIcon,
    );
  });
});
