import React from 'react';
import PropTypes from 'prop-types';

function Recipes(props) {
  const { recipe } = props;
  const { categorys } = props;

  const MAX_LENGTH = 12;
  const VALUE = 5;

  return (
    <main>
      {
        categorys.map((item) => (
          <button
            data-testid={ `${item.strCategory}-category-filter` }
            key={ item.strCategory }
          >
            { item.strCategory }
          </button>
        )).slice(0, VALUE)
      }
      {
        recipe.map((item, index) => (
          <div
            key={ item.idDrink || item.idMeal }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ item.strDrinkThumb || item.strMealThumb }
              alt="foto do produto"
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              {item.strMeal || item.strDrink}
            </p>
          </div>
        )).slice(0, MAX_LENGTH)
      }
    </main>
  );
}

Recipes.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  categorys: PropTypes.arrayOf(PropTypes.shape({
    strCategory: PropTypes.string.isRequired,
  })).isRequired,
};

export default Recipes;
