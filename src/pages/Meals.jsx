import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesCard from '../components/RecipesCard';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';
import Recipes from './Recipes';

function Meals() {
  const { data } = useContext(HeaderContext);

  const { meals, categorysMeals } = useContext(RecipesContext);

  const history = useHistory();

  useEffect(() => {
    if (data.length === 1) {
      history.push(`/meals/${data[0].idMeal}`);
    }
  }, [data, history]);

  return (
    <div>
      <h1>Meals</h1>
      <Header
        headerTypes={ {
          title: 'Comidas',
          searchButton: true,
          profileIcone: true,
          drink: false,
        } }
      />
      <Recipes recipe={ meals } categorys={ categorysMeals } type="meals" />
      {data.map((recipe, index) => {
        const { idMeal, strInstructions, strMeal, strMealThumb } = recipe;
        const max = 12;
        if (index < max) {
          return (
            <RecipesCard
              key={ idMeal }
              index={ index }
              name={ strMeal }
              recipe={ strInstructions }
              image={ strMealThumb }
            />
          );
        }
        return null;
      })}
      <Footer />
    </div>
  );
}

export default Meals;
