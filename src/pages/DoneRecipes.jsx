import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function Recipes() {
  const [doneRecipesItens, setDoneRecipesItens] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipesItens([...doneRecipes]);
    console.log(doneRecipes);
  }, []);

  console.log(doneRecipesItens);

  const setFilter = ({ target: { name } }) => {
    const filterDoneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));
    const listFiltered = filterDoneRecipesList.filter(({ type }) => type.includes(name));
    setDoneRecipesItens([...listFiltered]);
  };

  const copyToClipboard = ({ type, id }) => {
    const url = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
  };

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
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                onClick={ () => copyToClipboard(recipe) }
              >
                <img
                  src={ shareIcon }
                  alt="share"
                />
              </button>
              {linkCopied && <span>Link copied!</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recipes;
