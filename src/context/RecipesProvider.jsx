import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const { makeFetch, isLoading } = useFetch();

  useEffect(() => {
    const performFetch = async () => {
      const dataDrinks = await
      makeFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setDrinks(dataDrinks.drinks);

      const dataMeals = await
      makeFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setMeals(dataMeals.meals);
    };
    performFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = useMemo(() => ({
    meals, drinks, isLoading,
  }), [meals, drinks, isLoading]);

  return (
    <RecipesContext.Provider value={ values }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
