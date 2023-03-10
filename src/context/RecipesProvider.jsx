import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { verifyLocalDoneRecipes } from '../services/doneRecipesLS';
import { verifyLocalFavRecipe } from '../services/favoriteRecipesLS';
import { verifyLocalInProgressRecipe } from '../services/inProgressRecipesLS';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const values = useMemo(() => ({}), []);

  verifyLocalInProgressRecipe();
  verifyLocalFavRecipe();
  verifyLocalDoneRecipes();

  return (
    <RecipesContext.Provider value={ values }>{children}</RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipesProvider;
