import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Meals from '../pages/Meals';
import mockSearchFirstLetter from './helpers/Mocks/SearchBar/mockSearchFirstLetter';
import renderWithRouterAndContextProvider from './helpers/renderWithRouterAndContextProvider';

describe('Testando o componente "SearchBar"', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testando a pesquisa por primeira letra', async () => {
    renderWithRouterAndContextProvider(<Meals />);

    // Acessando os elementos.
    const btnInitSearch = screen.getByRole('img', { name: /search/i });
    userEvent.click(btnInitSearch);
    const searchInput = screen.getByRole('textbox');
    const radio = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByRole('button', { name: /pesquisar/i });

    // Mock
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockSearchFirstLetter),
    });

    // Interagindo com os elementos
    userEvent.type(searchInput, 'i');
    userEvent.click(radio);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(screen.getByText(/irish stew/i)).toBeInTheDocument();
    });

    const img = screen.getByRole('img', { name: /receita irish stew/i });
    expect(img).toBeInTheDocument();
  });
});
