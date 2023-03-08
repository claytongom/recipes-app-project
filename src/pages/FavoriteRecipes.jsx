import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  return (
    <div>
      <Header
        headerTypes={ {
          title: 'Favorite Recipes',
          searchButton: false,
          profileIcone: true,
          drink: false,
        } }
      />
    </div>
  );
}

export default FavoriteRecipes;
