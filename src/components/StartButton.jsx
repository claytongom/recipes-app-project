import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { recipeIsInDoneRecipes } from '../services/doneRecipesLS';
import {
  addToInProgressRecipes,
  recipeIsInProgressRecipes,
} from '../services/inProgressRecipesLS';

function StartButton({ id, type, ingredients, history }) {
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);

  useEffect(() => {
    recipeIsInDoneRecipes(id, setIsDone);
    recipeIsInProgressRecipes(id, type.toLowerCase(), setIsInProgress);
  }, [id, type]);

  const handleClick = () => {
    const objectData = ingredients.map((ingredient) => ({
      ...ingredient,
      checked: false,
    }));
    console.log(objectData);
    addToInProgressRecipes(id, type.toLowerCase(), objectData);
    history.push(`/${type.toLowerCase()}/${id}/in-progress`);
  };

  return (
    !isDone && (
      <button
        data-testid="start-recipe-btn"
        className="FixedBottom"
        onClick={ handleClick }
      >
        {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    )
  );
}

StartButton.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  id: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      ingredient: PropTypes.string,
      measure: PropTypes.string,
    }),
  ).isRequired,
  type: PropTypes.string.isRequired,
};

export default StartButton;
