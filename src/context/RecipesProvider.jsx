import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import useFetch from '../hooks/useFetch';

function RecipesProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [categorysMeals, setCategorysMeals] = useState([]);
  const [categorysDrinks, setCategorysDrinks] = useState([]);
  const { makeFetch } = useFetch();

  useEffect(() => {
    const performFetch = async () => {
      const dataDrinks = await makeFetch(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      );
      setDrinks(dataDrinks.drinks);

      const dataMeals = await makeFetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      );
      setMeals(dataMeals.meals);

      const dataCategorysMeals = await makeFetch(
        'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
      );
      setCategorysMeals(dataCategorysMeals.meals);

      const dataCategorysDrinks = await makeFetch(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
      );
      setCategorysDrinks(dataCategorysDrinks.drinks);
    };
    performFetch();
  }, [makeFetch]);

  const values = useMemo(
    () => ({
      meals,
      drinks,
      categorysMeals,
      categorysDrinks,
    }),
    [meals, drinks, categorysMeals, categorysDrinks],
  );

  return (
    <RecipesContext.Provider value={ values }>{children}</RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
