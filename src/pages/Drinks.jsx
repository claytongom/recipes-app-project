import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RecipesCard from '../components/RecipesCard';
import HeaderContext from '../context/HeaderContext';

function Drinks() {
  const { data } = useContext(HeaderContext);

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
        headerTypes={
          { title: 'Drinks', searchButton: true, profileIcone: true, drink: true }
        }
      />
      {data.map((recipe, index) => {
        const { idDrink, strInstructions, strDrink, strDrinkThumb } = recipe;
        const max = 12;
        if (index < max) {
          return (<RecipesCard
            key={ idDrink }
            index={ index }
            name={ strDrink }
            recipe={ strInstructions }
            image={ strDrinkThumb }
          />);
        }
        return null;
      })}
    </div>
  );
}

export default Drinks;
