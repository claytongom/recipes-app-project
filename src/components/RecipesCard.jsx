import PropTypes from 'prop-types';
import React from 'react';

function RecipesCard(props) {
  const { index, name, image, recipe } = props;
  return (
    <div>
      <p data-testid={ `${index}-card-name` }>{ name }</p>
      <img data-testid={ `${index}-card-img` } src={ image } alt={ `Receita ${name}` } />
      <p data-testid={ `${index}-recipe-card` }>{ recipe }</p>
    </div>
  );
}

RecipesCard.propTypes = {
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  recipe: PropTypes.string.isRequired,
};

export default RecipesCard;
