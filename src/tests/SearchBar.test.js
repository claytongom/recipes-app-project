import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Meals from '../pages/Meals';
import mockSearchIngredient from './helpers/Mocks/mockSearchIngredient';
import renderWithRouterAndContextProvider from './helpers/renderWithRouterAndContextProvider';

describe('Testando o componente "SearchBar"', () => {
  beforeEach(() => {
    renderWithRouterAndContextProvider(<Meals />);
    const HeaderBtnSearch = screen.getByRole('img', { name: /search/i });
    userEvent.click(HeaderBtnSearch);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockSearchIngredient),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Testando se escolher o radio ingredient e pesquisar vai fazer um fetch e renderizar as informações.', async () => {
    // Acessando os elementos.
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const searchInput = screen.getByRole('textbox');
    const searchBtn = screen.getByRole('button', { name: /pesquisar/i });

    // Interagindo com os elementos.
    userEvent.type(searchInput, 'carrot');
    userEvent.click(ingredientRadio);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(screen.getByText(/french lentils with garlic and thyme/i)).toBeInTheDocument();
    });
  });
});
