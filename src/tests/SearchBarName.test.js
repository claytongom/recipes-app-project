import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import mockSearchName from './helpers/Mocks/SearchBar/mockSearchName';
import renderWithRouterAndContextProvider from './helpers/renderWithRouterAndContextProvider';

describe('Testando o componente "SearchBar"', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testando a pesquisa por nome', async () => {
    const { history } = renderWithRouterAndContextProvider(<App />);
    act(() => history.push('/drinks'));

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

    userEvent.type(searchInput, 'Margarita');
    userEvent.click(radio);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(screen.getByText(/blue margarita/i)).toBeInTheDocument();
    });

    expect(
      screen.getByRole('img', { name: /blue margarita/i }),
    ).toBeInTheDocument();
  });
});
