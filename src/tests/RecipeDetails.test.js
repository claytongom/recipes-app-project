import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContextProvider from './helpers/renderWithRouterAndContextProvider';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

const endPoint = '/drinks/178319';
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
    expect(screen.getByRole('img', { name: /https:\/\/www\.thecocktaildb\.com\/images\/media\/drink\/zvsre31572902738\.jpg/i })).toBeInTheDocument();
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
      expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    });
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /share/i }));
    screen.logTestingPlaygroundURL();
  });

  test('Verifica se ao clicar no botão "Start Recipe" a rota é alterada', async () => {
    const { history } = renderWithRouterAndContextProvider(<App />);
    act(() => {
      history.push(endPoint);
    });

    await waitFor(() => {
      expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    });
    const startRecipeBTN = screen.getByRole('button', { name: /start recipe/i });
    expect(startRecipeBTN).not.toHaveTextContent('Continue Recipe');
    act(() => {
      userEvent.click(startRecipeBTN);
    });
    expect(history.location.pathname).toBe('/drinks/178319/in-progress');
    expect(localStorage.getItem('inProgressRecipes')).toBeTruthy();
  });

  // test('testando os botões "share" e "favorite"', async () => {
  //   const { history } = renderWithRouterAndContextProvider(<App />);
  //   act(() => {
  //     history.push(endPoint);
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByRole('img', { name: /corba/i })).toBeInTheDocument();
  //   });

  //   const btnShare = screen.getByRole('button', { name: /share/i });
  //   // const btnFavorite = screen.getByRole('button', { name: /share/i });
  //   act(() => {
  //     // userEvent.click(btnShare);
  //   });
  //   // await waitFor(() => expect(screen.getByText('Link copied!')).toBeInTheDocument());
  // });
});
