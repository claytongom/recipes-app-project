import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import renderWithRouterAndContextProvider from './helpers/renderWithRouterAndContextProvider';

describe('teste se as receitas funcionam corretamente', () => {
  it('deve renderizar todas as categorias corretamente', () => {
    renderWithRouterAndContextProvider(
      <Recipes isLoading={ false } recipe={ mealMock } />,
    );
    const categoryButtons = screen.getAllByRole('button');
    expect(categoryButtons.length).toBe(6);
  });

  it('deve renderizar "Carregando" se isLoading for true', () => {
    renderWithRouterAndContextProvider(<Recipes isLoading recipe={ mealMock } />);
    const loading = screen.getByText(/carregando/i);
    expect(loading).toBeInTheDocument();
  });

  it('todas as receitas devem renderizar corretamente', () => {
    renderWithRouterAndContextProvider(
      <Recipes isLoading={ false } recipe={ mealMock } />,
    );

    const recipes = screen.getAllByRole('img', {
      name: /foto do produto/i,
    });

    expect(recipes).toHaveLength(12);
  });

  it('deve renderizar filterRecipes ao clicar no filterButton', () => {
    renderWithRouterAndContextProvider(
      <Recipes isLoading={ false } recipe={ mealMock } />,
    );

    const recipes = screen.getAllByRole('img');

    userEvent.click(recipes[0]);

    expect(recipes).toHaveLength(12);
  });
});
