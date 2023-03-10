import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import mockSearchIngredient from './helpers/Mocks/SearchBar/mockSearchIngredient';
import renderWithRouterAndContextProvider from './helpers/renderWithRouterAndContextProvider';

describe('Testando o componente "SearchBar"', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testando a pesquisa por ingrediente', async () => {
    const { history } = renderWithRouterAndContextProvider(<App />);
    act(() => history.push('/meals'));

    // Acessando os elementos.
    const btnInitSearch = screen.getByRole('img', { name: /search/i });
    userEvent.click(btnInitSearch);
    const searchInput = screen.getByRole('textbox');
    const radio = screen.getByTestId('ingredient-search-radio');
    const searchBtn = screen.getByRole('button', { name: /pesquisar/i });

    // Mock
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockSearchIngredient),
    });

    userEvent.type(searchInput, 'carrot');
    userEvent.click(radio);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(
        screen.getByText(/french lentils with garlic and thyme/i),
      ).toBeInTheDocument();
    });

    const img = screen.getByRole('img', {
      name: /french lentils with garlic and thyme/i,
    });
    expect(img).toBeInTheDocument();
  });
});
