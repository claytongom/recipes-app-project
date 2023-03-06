import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import HeaderContext from '../context/HeaderContext';

function SearchBar(props) {
  const { drink } = props;
  const URL_TYPE = drink ? 'thecocktaildb' : 'themealdb';
  const { setData, search } = useContext(HeaderContext);
  const [searchType, setSearchType] = useState('');
  const URL_API_INGREDIENTES = `https://www.${URL_TYPE}.com/api/json/v1/1/filter.php?i=${search}`;
  const URL_API_NOME = `https://www.${URL_TYPE}.com/api/json/v1/1/search.php?s=${search}`;
  const URL_API_FIRST_LETTER = `https://www.${URL_TYPE}.com/api/json/v1/1/search.php?f=${search}`;

  async function fetchType(type) {
    let URL;
    switch (type) {
    case 'ingredient':
      URL = URL_API_INGREDIENTES;
      break;
    case 'name':
      URL = URL_API_NOME;
      break;
    case 'first-letter':
      URL = URL_API_FIRST_LETTER;
      break;
    default:
      break;
    }
    const responseAPI = await fetch(URL);
    const dataAPI = await responseAPI.json();
    const isDrink = drink ? 'drinks' : 'meals';
    if (dataAPI[isDrink] === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      setData(dataAPI[isDrink]);
    }
  }

  const handleClick = () => {
    if (searchType === 'first-letter' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      fetchType(searchType);
    }
  };

  return (
    <div>
      <label htmlFor="ingredient-search-radio">
        Ingredient
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="search-radio"
          value="ingredient"
          onChange={ ({ target: { value } }) => setSearchType(value) }
        />
      </label>
      <label htmlFor="name-search-radio">
        Name
        <input
          type="radio"
          data-testid="name-search-radio"
          name="search-radio"
          value="name"
          onChange={ ({ target: { value } }) => setSearchType(value) }
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        First letter
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="search-radio"
          value="first-letter"
          onChange={ ({ target: { value } }) => setSearchType(value) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Pesquisar
      </button>
    </div>

  );
}

SearchBar.propTypes = {
  drink: PropTypes.bool.isRequired,
};

export default SearchBar;
