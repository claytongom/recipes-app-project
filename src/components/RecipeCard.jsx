import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import StyledCard from '../styles/StyledCard';

function RecipeCard(props) {
  const { id, index, name, image, page, category, area } = props;
  return (
    <Link to={ `/${page}/${id}` }>
      <StyledCard data-testid={ `${index}-recipe-card` }>
        <h3 data-testid={ `${index}-card-name` }>{name}</h3>
        <div>
          <div>
            <p>
              <span>category:</span>
              {category}
            </p>
            <p>
              <span>area:</span>
              {area}
            </p>
          </div>
          <img data-testid={ `${index}-card-img` } src={ image } alt={ name } />
        </div>
      </StyledCard>
    </Link>
  );
}

RecipeCard.propTypes = {
  area: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};

export default RecipeCard;
