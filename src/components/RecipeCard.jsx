import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import StyledCard from '../styles/StyledCard';

function RecipeCard(props) {
  const { id, index, name, image, page } = props;
  return (
    <Link to={ `/${page}/${id}` }>
      <StyledCard data-testid={ `${index}-recipe-card` }>
        <h3 data-testid={ `${index}-card-name` }>{name}</h3>
        <img data-testid={ `${index}-card-img` } src={ image } alt={ name } />
      </StyledCard>
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
