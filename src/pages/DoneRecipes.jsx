import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import DoneCard from '../styles/DoneCard';
import DoneWrapper from '../styles/DoneWrapper';
import FilterButton from '../styles/FilterButton';
import FiltersWrapper from '../styles/FiltersWrapper';

function DoneRecipes() {
  const [doneRecipesItens, setDoneRecipesItens] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipesItens([...doneRecipes]);
    if (linkCopied) {
      const timer = 1500;
      const copyTimeout = setTimeout(() => {
        setLinkCopied(false);
      }, timer);
      return () => {
        clearTimeout(copyTimeout);
      };
    }
  }, [linkCopied]);

  useEffect(() => {
    const filterDoneRecipes = () => {
      const filterDoneRecipesList = JSON.parse(
        localStorage.getItem('doneRecipes'),
      );
      if (filter === 'meals') {
        const listFiltered = filterDoneRecipesList.filter(
          ({ type }) => type === 'meal',
        );
        setDoneRecipesItens([...listFiltered]);
      } else if (filter === 'drinks') {
        const listFiltered = filterDoneRecipesList.filter(
          ({ type }) => type === 'drink',
        );
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
      <Header title="Done Recipes" searchButton={ false } />
      <div>
        <div>
          <FiltersWrapper>
            <FilterButton
              type="button"
              data-testid="filter-by-all-btn"
              onClick={ () => setFilter('') }
            >
              All
            </FilterButton>
            <FilterButton
              type="button"
              data-testid="filter-by-meal-btn"
              onClick={ () => setFilter('meals') }
            >
              Meals
            </FilterButton>
            <FilterButton
              type="button"
              data-testid="filter-by-drink-btn"
              onClick={ () => setFilter('drinks') }
            >
              Drinks
            </FilterButton>
          </FiltersWrapper>
          <DoneWrapper>
            {doneRecipesItens.map((recipe, index) => (
              <DoneCard key={ index }>
                <Link to={ `${recipe.type}s/${recipe.id}` }>
                  <img
                    width="100"
                    height="100"
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                  />
                </Link>
                <div>
                  <span data-testid={ `${index}-horizontal-top-text` }>
                    {recipe.type === 'meal'
                      ? `${recipe.nationality} - ${recipe.category}`
                      : recipe.alcoholicOrNot}
                  </span>
                  <Link to={ `/${recipe.type}s/${recipe.id}` }>
                    <span data-testid={ `${index}-horizontal-name` }>
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
                    onClick={ () => copyToClipboard(recipe) }
                  >
                    <img src={ shareIcon } alt="share" />
                  </button>
                  {linkCopied && <span>Link copied!</span>}
                </div>
              </DoneCard>
            ))}
          </DoneWrapper>
        </div>
      </div>
    </div>
  );
}

export default DoneRecipes;
