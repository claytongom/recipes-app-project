import React from 'react';
import PropTypes from 'prop-types';

function Recipes(props) {
  const { recipe, isLoading } = props;

  const MAX_LENGTH = 12;
  if (isLoading) return 'Carregando';

  return (
    <main>
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
  recipe: PropTypes.arrayOf().isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Recipes;
