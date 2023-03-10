import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drinks from '../pages/Drinks';
import mockSearchName from './helpers/Mocks/SearchBar/mockSearchName';
import renderWithRouterAndContextProvider from './helpers/renderWithRouterAndContextProvider';

describe('Testando o componente "SearchBar"', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testando a pesquisa por nome', async () => {
    renderWithRouterAndContextProvider(<Drinks />);

    // Acessando os elementos.
    const btnInitSearch = screen.getByRole('img', { name: /search/i });
    userEvent.click(btnInitSearch);
    const searchInput = screen.getByRole('textbox');
    const radio = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByRole('button', { name: /pesquisar/i });

    // Mock
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockSearchName),
    });

    // Interagindo com os elementos
    userEvent.type(searchInput, 'margarita');
    userEvent.click(radio);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(screen.getByText(/blue margarita/i)).toBeInTheDocument();
    });

    const img = screen.getByRole('img', { name: /receita margarita/i });
    expect(img).toBeInTheDocument();
  });
});
