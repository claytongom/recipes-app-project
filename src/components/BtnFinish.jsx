import PropTypes from 'prop-types';
import React from 'react';
import { addToDoneRecipes } from '../services/doneRecipesLS';
import StartFinishButton from '../styles/StartFinishButton';

function BtnFinish({ isFinished, history, id, recipe, type }) {
  const handleClick = () => {
    history.push('/done-recipes');
    addToDoneRecipes(id, type, recipe);
  };

  return (
    <StartFinishButton
      data-testid="finish-recipe-btn"
      onClick={ handleClick }
      disabled={ isFinished }
    >
      Finish Recipe
    </StartFinishButton>
  );
}

BtnFinish.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  id: PropTypes.string.isRequired,
  isFinished: PropTypes.bool.isRequired,
  recipe: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
};

export default BtnFinish;
