import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import HeaderContext from '../context/HeaderContext';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header(props) {
  const [barVisibleLogic, setBarVisibleLogic] = useState(false);
  const { search, setSearch } = useContext(HeaderContext);

  const { headerTypes: { title, searchButton, profileIcone, drink } } = props;

  return (
    <div>
      <h1 data-testid="page-title">{ title }</h1>
      { profileIcone && (
        <Link to="/profile">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="profile" />
        </Link>
      )}
      { barVisibleLogic && (
        <>
          <input
            type="text"
            data-testid="search-input"
            onChange={ ({ target: { value } }) => setSearch(value) }
            value={ search }
          />
          <SearchBar drink={ drink } />
        </>
      )}
      { searchButton && (
        <button
          type="button"
          onClick={ () => setBarVisibleLogic(!barVisibleLogic) }
        >
          <img data-testid="search-top-btn" src={ searchIcon } alt="search" />
        </button>
      )}
    </div>
  );
}

Header.propTypes = {
  headerTypes: PropTypes.shape({
    title: PropTypes.string.isRequired,
    searchButton: PropTypes.bool.isRequired,
    profileIcone: PropTypes.bool.isRequired,
    drink: PropTypes.bool.isRequired,
  }).isRequired,
};
