import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Gift from '../components/Gift';
import Header from '../components/Header';
import getTitleAndButton from '../helpers/getTitleAndButton';
import FiltersWrapper from '../styles/FiltersWrapper';
import FilterButton from '../styles/FilterButton';

function FavoriteRecipes() {
  const { pathname } = useLocation();
  const [pageInfo] = useState(getTitleAndButton(pathname));
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [filterMeal, setFilterMeal] = useState(false);
  const [filterDrink, setFilterDrink] = useState(false);
  const [showGift, setShowGift] = useState(false);
  // executar as receitas que estão salvas
  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const favoriteRecipes = JSON.parse(
        localStorage.getItem('favoriteRecipes'),
      );
      setFavorites(favoriteRecipes);
    }
  }, []);
  // execuntando as receitas COMIDAS e BEBIDAS
  useEffect(() => {
    if (!filterMeal && !filterDrink) {
      setFilteredFavorites(favorites);
    } else if (filterMeal) {
      const mealFavorites = favorites.filter(
        (recipe) => recipe.type === 'meal',
      );
      setFilteredFavorites(mealFavorites);
    } else if (filterDrink) {
      const drinkFavorites = favorites.filter(
        (recipe) => recipe.type === 'drink',
      );
      setFilteredFavorites(drinkFavorites);
    }
  }, [favorites, filterMeal, filterDrink]);
  // lidar com os cards favoritos
  const handleFavorite = (id) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  };
  // mostra o alerta se tem ou não aquela receita
  const showAlert = () => {
    const GIFT_TIMEOUT = 500;

    setShowGift(true);
    setTimeout(() => {
      setShowGift(false);
    }, GIFT_TIMEOUT);
  };
  // manipular e compartilhar COMIDAS e DRINKS usando um alerta
  const handleShare = (id, type) => {
    const BASE_URL = 'http://localhost:3000';
    const url = type === 'meal' ? `${BASE_URL}/meals/${id}` : `${BASE_URL}/drinks/${id}`;

    showAlert();
    copy(url);
  };
  // filtrando as receitas
  const handleFilter = (type) => {
    if (type === 'meal') {
      setFilterMeal(true);
      setFilterDrink(false);
    } else if (type === 'drink') {
      setFilterDrink(true);
      setFilterMeal(false);
    } else {
      setFilterMeal(false);
      setFilterDrink(false);
    }
  };
  // serve para renderizar as receitas favoritas
  const renderFavoriteRecipes = filteredFavorites.map((recipe, index) => {
    const { id, type, name, image, category, alcoholicOrNot, nationality } = recipe;
    const url = type === 'meal' ? `/meals/${id}` : `/drinks/${id}`;

    return (
      <div key={ id }>
        <a href={ url }>
          <img
            width="200px"
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
          />
        </a>
        <div data-testid={ `${index}-horizontal-top-text` }>
          {`${nationality} - ${category}`}
        </div>
        <Link to={ url }>
          <div data-testid={ `${index}-horizontal-name` }>{name}</div>
        </Link>
        <button
          type="button"
          onClick={ () => handleShare(id, type) }
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
        >
          <img src={ shareIcon } alt="Compartilhar receita" />
        </button>
        <button
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          type="button"
          onClick={ () => handleFavorite(id) }
        >
          <img src={ blackHeartIcon } alt="Desfavoritar receita" />
        </button>
        {alcoholicOrNot && (
          <div data-testid={ `${index}-horizontal-top-text` }>
            {alcoholicOrNot}
          </div>
        )}
      </div>
    );
  });
  // elementos da tela de receitas favoritas passando os (data-testids)
  return (
    <>
      <Header title={ pageInfo.title } searchButton={ pageInfo.haveButton } />
      <div>
        <FiltersWrapper>
          <FilterButton
            onClick={ () => handleFilter('all') }
            data-testid="filter-by-all-btn"
            type="button"
          >
            All
          </FilterButton>
          <FilterButton
            onClick={ () => handleFilter('meal') }
            data-testid="filter-by-meal-btn"
            type="button"
          >
            Meals
          </FilterButton>
          <FilterButton
            onClick={ () => handleFilter('drink') }
            data-testid="filter-by-drink-btn"
            type="button"
          >
            Drinks
          </FilterButton>
        </FiltersWrapper>
      </div>
      {renderFavoriteRecipes}
      {showGift && <Gift message="Link copied!" />}
    </>
  );
}

export default FavoriteRecipes;
