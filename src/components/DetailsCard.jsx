import PropTypes from 'prop-types';
import React from 'react';

function DetailsCard({ recipeData, type, video, strIngredient, urlAndType }) {
  const ingredientElements = strIngredient.map((item, index) => {
    const { ingredient, measure } = item;

    return (
      <li data-testid={ `${index}-ingredient-name-and-measure` } key={ ingredient }>
        {`${ingredient} - ${measure}`}
      </li>
    );
  });

  return (
    <div>
      <h1 data-testid="recipe-title">{recipeData[`str${type}`]}</h1>

      <img
        src={ recipeData[`str${type}Thumb`] }
        alt={ `Recipe ${recipeData[`str${type}`]}` }
        data-testid="recipe-photo"
      />

      {urlAndType.type === 'meals' ? (
        <p data-testid="recipe-category">{recipeData.strCategory}</p>
      ) : (
        <p data-testid="recipe-category">{recipeData.strAlcoholic}</p>
      )}

      <h2>Ingredientes</h2>
      <ul>{ingredientElements}</ul>

      <h2>Intructions</h2>
      <p data-testid="instructions">{recipeData.strInstructions}</p>

      <h2>Video</h2>
      <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ `https://www.youtube.com/embed/${video}` }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media"
        allowFullScreen
      />
    </div>
  );
}

DetailsCard.propTypes = {
  recipeData: PropTypes.shape({
    strAlcoholic: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
  }).isRequired,
  strIngredient: PropTypes.arrayOf(
    PropTypes.shape({
      ingredient: PropTypes.string.isRequired,
      measure: PropTypes.string.isRequired,
    }),
  ).isRequired,
  type: PropTypes.string.isRequired,
  urlAndType: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
  video: PropTypes.string.isRequired,
};

export default DetailsCard;
