import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

function Carousel({ dataApiDrinks, dataApiMeals, type }) {
  const [recApiDrinks, setRecApiDrinks] = useState([]);
  const [recApiMeals, setRecApiMeals] = useState([]);

  useEffect(() => {
    if (dataApiDrinks && dataApiMeals) {
      const seis = 6;
      setRecApiDrinks(dataApiDrinks.slice(0, seis));
      setRecApiMeals(dataApiMeals.slice(0, seis));
    }
  }, [dataApiDrinks, dataApiMeals]);

  const renderDrinks = recApiDrinks.map((rec, index) => (
    <div
      data-testid={ `${index}-recommendation-card` }
      key={ rec.idDrink }
      className="card"
    >
      <p data-testid={ `${index}-recommendation-title` }>
        {rec.strDrink}
      </p>
    </div>));

  const renderMeals = recApiMeals.map((rec, index) => (
    <div
      className="card"
      data-testid={ `${index}-recommendation-card` }
      key={ rec.idMeal }
    >
      <p data-testid={ `${index}-recommendation-title` }>
        {rec.strMeal}
      </p>
    </div>));
  return (
    <car
      id="Carousel"
    >
      {type === 'meals' ? renderDrinks : renderMeals}
    </car>
  );
}

Carousel.propTypes = {
  dataApiDrinks: propTypes.arrayOf(
    propTypes.shape({}),
  ).isRequired,
  dataApiMeals: propTypes.arrayOf(
    propTypes.shape({}),
  ).isRequired,
  type: propTypes.string.isRequired,
};

export default Carousel;
