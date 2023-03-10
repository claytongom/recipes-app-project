import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Meals from '../pages/Meals';
import renderWithRouterAndContextProvider from './helpers/renderWithRouterAndContextProvider';

describe('Testando as exceções do componente "SearchBar"', () => {
  beforeEach(() => {
    renderWithRouterAndContextProvider(<Meals />);
    const btnInitSearch = screen.getByRole('img', { name: /search/i });
    userEvent.click(btnInitSearch);
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: null,
      }),
    });
  });

  test('Verifica se não selecionar o tipo de busca, então não renderiza nada', () => {
    const searchInput = screen.getByRole('textbox');
    const radio = screen.getByTestId('ingredient-search-radio');
    const searchBtn = screen.getByRole('button', { name: /pesquisar/i });
    jest.spyOn(global, 'alert');
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    userEvent.type(searchInput, 'asda');
    userEvent.click(radio);
    userEvent.click(searchBtn);
  });
});
