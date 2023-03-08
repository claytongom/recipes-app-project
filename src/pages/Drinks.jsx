import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesCard from '../components/RecipesCard';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';
import Recipes from './Recipes';

function Drinks() {
  const { data } = useContext(HeaderContext);
  const { drinks } = useContext(RecipesContext);

  const history = useHistory();

  useEffect(() => {
    if (data.length === 1) {
      history.push(`/drinks/${data[0].idDrink}`);
    }
  }, [data, history]);

  return (
    <div>
      <h1>Drinks</h1>
      <Header
        headerTypes={ {
          title: 'Drinks',
          searchButton: true,
          profileIcone: true,
          drink: true,
        } }
      />
      <Recipes recipe={ drinks } />
      {data.map((recipe, index) => {
        const { idDrink, strInstructions, strDrink, strDrinkThumb } = recipe;
        const max = 12;
        if (index < max) {
          return (
            <RecipesCard
              key={ idDrink }
              index={ index }
              name={ strDrink }
              recipe={ strInstructions }
              image={ strDrinkThumb }
            />
          );
        }
        return null;
      })}
      <Footer />
    </div>
  );
}

export default Drinks;
