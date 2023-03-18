import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import { fetchData } from '../services/fetchs';
import CarouselCard from '../styles/CarouselCard';
import CarouselImage from '../styles/CarouselImage';
import CarouselContainer from './CarouselContainer';
import CarouselWrapper from './CarouselWrapper';

const MAX_RECIPES = 6;

function Carousel({ type }) {
  const { setRecipes, recipes } = useContext(RecipesContext);

  useEffect(() => {
    const reversetype = type === 'Meals' ? 'Drinks' : 'Meals';
    fetchData(reversetype, setRecipes);
  }, [setRecipes, type]);

  const renderMeals = recipes
    .map((recipe, index) => (
      <CarouselCard key={ index } data-testid={ `${index}-recommendation-card` }>
        <p data-testid={ `${index}-recommendation-title` }>
          {recipe.strDrink || recipe.strMeal}
        </p>
        <CarouselImage
          src={ recipe.strDrinkThumb || recipe.strMealThumb }
          alt={ recipe.strDrink || recipe.strMeal }
          className="carouselImage"
        />
      </CarouselCard>
    ))
    .slice(0, MAX_RECIPES);

  return (
    <CarouselWrapper>
      <h2>Advices</h2>
      <CarouselContainer>{renderMeals}</CarouselContainer>
    </CarouselWrapper>
  );
}

Carousel.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Carousel;
