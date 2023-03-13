import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import mockSearchFirstLetter from './helpers/Mocks/SearchBar/mockSearchFirstLetter';
import renderWithRouterAndContextProvider from './helpers/renderWithRouterAndContextProvider';

describe('Testando o componente "SearchBar"', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testando a pesquisa por primeira letra', async () => {
    const { history } = renderWithRouterAndContextProvider(<App />);
    act(() => history.push('/meals'));

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

    userEvent.type(searchInput, 'e');
    userEvent.click(radio);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(screen.getByText(/eton mess/i)).toBeInTheDocument();
    });

    expect(screen.getByRole('img', { name: /eton mess/i })).toBeInTheDocument();
  });
});
