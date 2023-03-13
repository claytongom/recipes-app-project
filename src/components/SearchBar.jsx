import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import { fetchBySearch } from '../services/fetchs';
import SearchBarWrapper from '../styles/SearchBarWrapper';
import StyledButton from '../styles/StyledButton';
import StyledInput from '../styles/StyledInput';
import StyledLabel from '../styles/StyledLabel';

function SearchBar({ type }) {
  const { setRecipes, setMakeSearch } = useContext(RecipesContext);

  const [search, setSearch] = useState({
    text: '',
    type: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setSearch({
      ...search,
      [name]: value,
    });
  };

  const handleClick = () => {
    const verify = search.text.length !== 1 && search.type === 'first-letter';
    if (verify) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      setMakeSearch(true);
      fetchBySearch(type, search.type, search.text, setRecipes);
    }
  };

  return (
    <SearchBarWrapper>
      <StyledInput
        type="text"
        data-testid="search-input"
        value={ search.text }
        name="text"
        onChange={ handleChange }
      />
      <div>
        <StyledLabel htmlFor="ingredient-search-radio">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="type"
            value="ingredient"
            onChange={ handleChange }
          />
          Ingredient
        </StyledLabel>
        <StyledLabel htmlFor="name-search-radio">
          <input
            type="radio"
            data-testid="name-search-radio"
            name="type"
            value="name"
            onChange={ handleChange }
          />
          Name
        </StyledLabel>
        <StyledLabel htmlFor="first-letter-search-radio">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="type"
            value="first-letter"
            onChange={ handleChange }
          />
          First letter
        </StyledLabel>
      </div>
      <StyledButton
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Pesquisar
      </StyledButton>
    </SearchBarWrapper>
  );
}

SearchBar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SearchBar;
