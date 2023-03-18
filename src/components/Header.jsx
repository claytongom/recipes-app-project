import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import PatternHeading from '../styles/PatternHeading';
import RecipesLogo from '../styles/RecipesLogo';
import HeaderWrapper from '../styles/HeaderWrapper';
import logo from '../images/chef.png';

export default function Header(props) {
  const [barVisibleLogic, setBarVisibleLogic] = useState(false);

  const { title, searchButton } = props;

  return (
    <>
      <HeaderWrapper>
        <RecipesLogo src={ logo } />
        <PatternHeading data-testid="page-title">{title}</PatternHeading>

        <div>
          <Link to="/profile">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile"
            />
          </Link>
          {searchButton && (
            <button
              type="button"
              onClick={ () => setBarVisibleLogic(!barVisibleLogic) }
            >
              <img data-testid="search-top-btn" src={ searchIcon } alt="search" />
            </button>
          )}
        </div>
      </HeaderWrapper>
      {barVisibleLogic && <SearchBar type={ title } />}
    </>
  );
}

Header.propTypes = {
  searchButton: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
