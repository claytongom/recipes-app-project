import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import DetailsHeader from '../styles/DetailsHeader';
import PatternHeading from '../styles/PatternHeading';
import BtnsFavAndShare from './BtnsFavAndShare';
import logo from '../images/chef.png';
import DetailsImage from '../styles/DetailsImage';
import DetailsWrapper from '../styles/DetailsWrapper';

function DetailsCard({ id, recipe, ingredients, type }) {
  const [video, setVideo] = useState('');

  useEffect(() => {
    if (recipe.strYoutube) {
      const cut = 32;
      const videoId = recipe.strYoutube.slice(cut);
      setVideo(videoId);
    }
  }, [recipe]);

  const renderIngredients = ingredients.map((item, index) => {
    const { ingredient, measure } = item;

    return (
      <li data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
        {`${ingredient} - ${measure}`}
      </li>
    );
  });

  return (
    <>
      <DetailsHeader>
        <img src={ logo } alt="Imagem logo" />
        <PatternHeading data-testid="recipe-title">
          {recipe.strMeal || recipe.strDrink}
        </PatternHeading>
      </DetailsHeader>
      <DetailsWrapper>
        <DetailsImage
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt={ recipe.strMealThumb || recipe.strDrinkThumb }
          data-testid="recipe-photo"
        />

        <BtnsFavAndShare id={ id } recipe={ recipe } type={ type } />

        <h2>Category</h2>
        <p data-testid="recipe-category">
          {type === 'Meals' ? recipe.strCategory : recipe.strAlcoholic}
        </p>

        <h2>Ingredients</h2>
        <ul>{renderIngredients}</ul>

        <h2>Instructions</h2>
        <p data-testid="instructions">{recipe.strInstructions}</p>

        {recipe.strYoutube && (
          <>
            <h2>Video</h2>
            <iframe
              data-testid="video"
              width="360"
              height="180"
              src={ `https://www.youtube.com/embed/${video}` }
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media"
              allowFullScreen
            />
          </>
        )}
      </DetailsWrapper>
    </>
  );
}

DetailsCard.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      ingredient: PropTypes.string,
      measure: PropTypes.string,
    }),
  ).isRequired,
  recipe: PropTypes.shape({
    strAlcoholic: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strInstructions: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strYoutube: PropTypes.string,
  }).isRequired,
};

export default DetailsCard;
