import React from 'react';
import { getByTestId, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import getTitleAndButton from '../helpers/getTitleAndButton';
jest.mock('../helpers/getTitleAndButton');

import renderWithRouterAndContextProvider from './helpers/renderWithRouterAndContextProvider';

describe('Testes da tela de Receitas Favoritas', () => {
  const mealName = 'Sushi';
  const drinkName = 'Adam';
  const mealFilterName = 'filter-by-meal-btn';
  const drinkFilterName = 'filter-by-drink-btn';
  const allFilterName = 'filter-by-all-btn';
  // antes de cada Card favoritado
  beforeEach(() => {
    const favoriteRecipes = [
      {
        id: '53065',
        type: 'meal',
        nationality: 'Japanese',
        category: 'Seafood',
        alcoholicOrNot: '',
        image:
          'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
        name: 'Sushi',
      },
      {
        id: '17837',
        type: 'drink',
        nationality: '',
        category: 'Ordinary Drink',
        alcoholicOrNot: 'Alcoholic',
        image:
          'https://www.thecocktaildb.com/images/media/drink/v0at4i1582478473.jpg',
        name: 'Adam',
      },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    getTitleAndButton.mockReturnValue({
      title: 'Favorites Recipes',
      haveButton: false,
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('teste se os botões de filtro estão na tela', () => {
    renderWithRouterAndContextProvider(<FavoriteRecipes />);

    const mealFilter = screen.getByTestId(mealFilterName);
    const allFilter = screen.getByTestId(allFilterName);
    const drinkFilter = screen.getByTestId(drinkFilterName);

    expect(mealFilter).toBeInTheDocument();
    expect(allFilter).toBeInTheDocument();
    expect(drinkFilter).toBeInTheDocument();
  });

  test('teste se as duas receitas favoritas estão na tela', () => {
    renderWithRouterAndContextProvider(<FavoriteRecipes />);

    const meal = screen.getByText('Sushi');
    const drink = screen.getByText('Adam');

    expect(meal).toBeInTheDocument();
    expect(drink).toBeInTheDocument();
  });

  test('teste o funcionamento do botão de desfavoritar', () => {
    renderWithRouterAndContextProvider(<FavoriteRecipes />);

    const meal = screen.getByText(mealName);
    const drink = screen.getByText(drinkName);

    const mealUnfavoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');

    userEvent.click(mealUnfavoriteBtn);

    expect(drink).toBeInTheDocument();
    expect(meal).not.toBeInTheDocument();
  });

  // test('teste funcionamento do botao de compartilhar', () => {
  //   renderWithRouterAndContextProvider(<FavoriteRecipes />);
  //   const mealShareBtn = screen.getByTestId('0-horizontal-share-btn');

  //   userEvent.click(mealShareBtn);
  //   const linkCopied = screen.getAllByText(/link copied!/i);

  //   expect(linkCopied).toHaveLength(1);
  // });

  // test('teste o funcionamento do botão de filtro Meals', () => {
  //   renderWithRouterAndContextProvider(<FavoriteRecipes />);

  //   const mealFilter = screen.getByTestId(mealFilterName);

  //   userEvent.click(mealFilter);
  //   expect(mealFilter).toBeInTheDocument();
  // });

  // test('teste o funcionamento do botão de filtro Drinks', () => {
  //   renderWithRouterAndContextProvider(<FavoriteRecipes />);
  //   const drinksFilter = getByTestId('favorite-btn');

  //   userEvent.click(drinksFilter);
  //   expect(drinksFilter).toBeInTheDocument();
  // });

  // test('teste o funcionamento do botão de filtro All', () => {
  //   renderWithRouterAndContextProvider(<FavoriteRecipes />);

  //   const allFilter = screen.getByTestId(allFilterName);

  //   userEvent.click(allFilter);
  //   expect(allFilter).toBeInTheDocument();
  // });

  // test('teste se a imagem Meals aparece nos favoritos', () => {
  //   const imageMeals = screen.getByRole('img', { name: /sushi/i });
  //   expect(imageMeals).toBeInTheDocument();
  // });

  // test('teste se a imagem Drinks aparece nos favoritos', () => {
  //   const imageDrinks = screen.getByRole('img', { name: /adam/i });
  //   expect(imageDrinks).toBeInTheDocument();
  // });
});
