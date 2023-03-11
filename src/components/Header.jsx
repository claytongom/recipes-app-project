import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header(props) {
  const [barVisibleLogic, setBarVisibleLogic] = useState(false);

  const { title, searchButton } = props;

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>

      <Link to="/profile">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profile" />
      </Link>

      {barVisibleLogic && <SearchBar type={ title } />}
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
  searchButton: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
