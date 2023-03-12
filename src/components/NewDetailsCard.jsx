import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import BtnsFavAndShare from './BtnsFavAndShare';

function NewDetailsCard({ id, recipe, ingredients, type }) {
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
    <div>
      <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>

      <img
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

      <h2>Intructions</h2>
      <p data-testid="instructions">{recipe.strInstructions}</p>

      {recipe.strYoutube && (
        <>
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
        </>
      )}
    </div>
  );
}

NewDetailsCard.propTypes = {
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

export default NewDetailsCard;
