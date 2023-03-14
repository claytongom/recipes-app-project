import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouterAndContextProvider from './helpers/renderWithRouterAndContextProvider';

describe('Testa a página DoneRecipes', () => {
//   const endpoint = '/done-recipes';

  it('Testa se a página contém os botões de filtro', () => {
    renderWithRouterAndContextProvider(<DoneRecipes />);
    // act(() => {
    //   history.push(endpoint);
    // });
    // acessando os botões de filtro:
    const allFilterButton = screen.getByRole('button', { name: /all/i });
    const MealsFilterButton = screen.getByRole('button', { name: /meals/i });
    const drinkFilterButton = screen.getByRole('button', { name: /drinks/i });

    // testando se os botões estão na tela:
    expect(allFilterButton).toBeInTheDocument();
    expect(MealsFilterButton).toBeInTheDocument();
    expect(drinkFilterButton).toBeInTheDocument();
  });
});
