import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import { fetchByFilter } from '../services/fetchs';
import FilterButton from '../styles/FilterButton';

function BtnCategory({ categoryName, type, removeFilter }) {
  const { setRecipes, filter, setFilter, setMakeSearch } = useContext(RecipesContext);

  // Função para fazer o filtro.
  const filterByCategory = (curretFilter) => {
    fetchByFilter(type, curretFilter, setRecipes);
    setFilter(curretFilter);
    setMakeSearch(false);
  };

  const toggleFunction = (currentFilter) => {
    if (filter === currentFilter) {
      removeFilter();
    } else {
      filterByCategory(currentFilter);
    }
  };

  return (
    <FilterButton
      data-testid={ `${categoryName}-category-filter` }
      onClick={ () => toggleFunction(categoryName) }
    >
      {categoryName}
    </FilterButton>
  );
}

BtnCategory.propTypes = {
  categoryName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  removeFilter: PropTypes.func.isRequired,
};

export default BtnCategory;
