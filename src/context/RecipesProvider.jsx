import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const values = useMemo(() => ({}), []);

  return (
    <RecipesContext.Provider value={ values }>{children}</RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipesProvider;
