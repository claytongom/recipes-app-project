import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard(props) {
  const { id, index, name, image, page } = props;
  return (
    <Link to={ `/${page}/${id}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <p data-testid={ `${index}-card-name` }>{name}</p>
        <img data-testid={ `${index}-card-img` } src={ image } alt={ name } />
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};

export default RecipeCard;
