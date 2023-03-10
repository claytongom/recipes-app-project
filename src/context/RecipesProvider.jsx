import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { verifyLocalDoneRecipes } from '../services/doneRecipesLS';
import { verifyLocalFavRecipe } from '../services/favoriteRecipesLS';
import { verifyLocalInProgressRecipe } from '../services/inProgressRecipesLS';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [filter, setFilter] = useState('');
  const [makeSearch, setMakeSearch] = useState(false);

  verifyLocalInProgressRecipe();
  verifyLocalFavRecipe();
  verifyLocalDoneRecipes();

  const values = useMemo(
    () => ({
      recipes,
      setRecipes,
      categorys,
      setCategorys,
      filter,
      setFilter,
      makeSearch,
      setMakeSearch,
    }),
    [recipes, categorys, filter, makeSearch],
  );

  return (
    <RecipesContext.Provider value={ values }>{children}</RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
