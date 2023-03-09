import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function Recipes() {
  // criar estado controlar qual categoria estou filtrando
  const [doneRecipesItens, setDoneRecipesItens] = useState([]);
  // pegar os dados do localStorage
  useEffect(() => {
    // localStorage.setItem('doneRecipes', JSON.stringify([{
    // id: 52908,
    // type: 'meal',
    // nationality: 'French',
    // category: 'Vegetarian',
    // alcoholicOrNot: '',
    // name: 'Ratatouille',
    // image: 'https://www.themealdb.com/images/media/meals/wrpwuu1511786491.jpg',
    // doneDate: '2023-03-08',
    // tags: ['Vegetables', 'SideDish'] }]));
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipesItens([...doneRecipes]);
    console.log(doneRecipes);
  }, []);

  console.log(doneRecipesItens);
  // fazer um map pois é um array de receitas
  // sugestão 1: criar um estado para guardar as receitas filtradas
  const setFilter = ({ target: { name } }) => {
    const filterDoneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));
    const listFiltered = filterDoneRecipesList.filter(({ type }) => type.includes(name));
    setDoneRecipesItens([...listFiltered]);
  };
  // sugestão 2: antes do map realizar um filter e economizar uma atualização de estado
  // dica: usando operador ternário eu posso decidir o que imprimir na tela if else

  return (
    <div>
      <Header
        headerTypes={ {
          title: 'Done Recipes',
          searchButton: false,
          profileIcone: true,
          drink: false,
        } }
      />
      <div>
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setFilter('') }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            onClick={ () => setFilter('meals') }
          >
            Meals
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setFilter('drinks') }
          >
            Drinks
          </button>
          {doneRecipesItens.map((recipe, index) => (
            <div key={ index }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
              <span data-testid={ `${index}-horizontal-top-text` }>
                {recipe.type === 'meal'
                  ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot}
              </span>
              <span data-testid={ `${index}-horizontal-name` }>
                {recipe.name}
              </span>
              <span data-testid={ `${index}-horizontal-done-date` }>
                {recipe.doneDate}
              </span>
              {recipe.tags.map((item) => (
                <span
                  data-testid={ `${index}-${item}-horizontal-tag` }
                  key={ item }
                >
                  {item}
                </span>
              ))}
              <img
                src="src/images/shareIcon.svg"
                alt="botão de compartilhar receita"
                data-testid={ `${index}-horizontal-share-btn` }
              />
              <img
                src={ shareIcon }
                alt="share"
                data-testid={ `0-${index}-horizontal-favorite-btn` }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recipes;
