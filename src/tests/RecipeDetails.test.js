import RecipeDetails from '../pages/RecipeDetails';
import mockSushi from './helpers/Mocks/Recipes/mockSushi';
import renderWithRouterAndContextProvider from './helpers/renderWithRouterAndContextProvider';

describe('Teste da página Recipe Details', () => {
  // Fazendo o mock da receita e a renderização da página Recipe Details.
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockSushi),
    });
    renderWithRouterAndContextProvider(<RecipeDetails />);
  });

  test('Verifica se possui um título para o nome da receita', () => {});
});
