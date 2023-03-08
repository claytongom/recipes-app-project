import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Meals from '../pages/Meals';
import Recipes from '../pages/Recipes';
import renderWithRouterAndContextProvider from './helpers/renderWithRouterAndContextProvider';

describe('Testando pagina Meals e Drinks ', () => {
  it('Teste renderizando na pagina Meals', async () => {
    renderWithRouterAndContextProvider(<Meals />);
    await waitFor(() => {
      expect(screen.getByText(/corba/i)).toBeInTheDocument();
    });
  });

  it('', () => {
  });
});
