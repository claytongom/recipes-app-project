import PropTypes from 'prop-types';
import React, { useEffect, useMemo } from 'react';
import RecipesContext from './recipesContext';

function RecipesProvider({ children }) {
  useEffect(() => {

  }, []);

  const values = useMemo(() => ({}), []);

  return (
    <RecipesContext.Provider value={ values }>{children}</RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipesProvider;
