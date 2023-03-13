import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import renderWithRouterAndContextProvider from './helpers/renderWithRouterAndContextProvider';

describe('Testando as exceções do componente "SearchBar"', () => {
  beforeEach(() => {
    const { history } = renderWithRouterAndContextProvider(<App />);
    act(() => {
      history.push('/meals');
    });
    const btnInitSearch = screen.getByRole('img', { name: /search/i });
    userEvent.click(btnInitSearch);
    jest.spyOn(global, 'alert');
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  test('Verifica se pesquisar mais de uma letra no first letter emite um alert', () => {
    const searchInput = screen.getByRole('textbox');
    const searchBtn = screen.getByRole('button', { name: /pesquisar/i });
    const radio = screen.getByTestId('first-letter-search-radio');

    // Interagindo com os elementos
    userEvent.type(searchInput, 'mais');
    userEvent.click(radio);
    userEvent.click(searchBtn);

    expect(window.alert).toHaveBeenCalledTimes(1);
  });
});
