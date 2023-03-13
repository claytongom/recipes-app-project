import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipesItens, setDoneRecipesItens] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipesItens([...doneRecipes]);
  }, []);

  useEffect(() => {
    const filterDoneRecipes = () => {
      const filterDoneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));
      if (filter === 'meals') {
        const listFiltered = filterDoneRecipesList.filter(({ type }) => type === 'meal');
        setDoneRecipesItens([...listFiltered]);
      } else if (filter === 'drinks') {
        const listFiltered = filterDoneRecipesList.filter(({ type }) => type === 'drink');
        setDoneRecipesItens([...listFiltered]);
      } else {
        setDoneRecipesItens([...filterDoneRecipesList]);
      }
    };

    filterDoneRecipes();
  }, [filter]);

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
              <Link to={ `${recipe.type}s/${recipe.id}` }>
                <img
                  width="100"
                  height="100"
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                />
              </Link>
              <span data-testid={ `${index}-horizontal-top-text` }>
                {recipe.type === 'meal'
                  ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot}
              </span>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <span
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipe.name}
                </span>
              </Link>

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
                onClick={
                  () => copyToClipboard(recipe)
                }
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

export default DoneRecipes;
