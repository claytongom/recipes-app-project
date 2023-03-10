import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header(props) {
  const [barVisibleLogic, setBarVisibleLogic] = useState(false);

  const {
    headerTypes: { title, searchButton, profileIcone, type },
  } = props;

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      {profileIcone && (
        <Link to="/profile">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="profile" />
        </Link>
      )}
      {barVisibleLogic && <SearchBar type={ type } />}
      {searchButton && (
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
    type: PropTypes.string.isRequired,
  }).isRequired,
};
