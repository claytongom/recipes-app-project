import React from 'react';
import Header from '../components/Header';

function Recipes() {
  return (
    <div>
      <Header
        headerTypes={ {
          title: 'Done Recipes',
          searchButton: false,
          profileIcone: true,
          drink: false,
        } }
      />
    </div>
  );
}

export default Recipes;
