import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import { fetchData } from '../services/fetchs';

const MAX_RECIPES = 6;

function Carousel({ type }) {
  const { setRecipes, recipes } = useContext(RecipesContext);

  useEffect(() => {
    const reversetype = type === 'Meals' ? 'Drinks' : 'Meals';
    fetchData(reversetype, setRecipes);
  }, [setRecipes, type]);

  const renderMeals = recipes
    .map((recipe, index) => (
      <div
        key={ index }
        className="carouselCard"
        data-testid={ `${index}-recommendation-card` }
      >
        <p data-testid={ `${index}-recommendation-title` }>
          {recipe.strDrink || recipe.strMeal}
        </p>
        <img
          src={ recipe.strDrinkThumb || recipe.strMealThumb }
          alt={ recipe.strDrink || recipe.strMeal }
          className="carouselImage"
        />
      </div>
    ))
    .slice(0, MAX_RECIPES);

  return (
    <div>
      <h2>Recommedations</h2>
      <div className="carouselContainer">{renderMeals}</div>
    </div>
  );
}

Carousel.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Carousel;
