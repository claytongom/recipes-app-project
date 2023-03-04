import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Recipes from './Recipes';
import { RecipesContext } from '../context/RecipesProvider';

function Meals() {
  const { meals, isLoading } = useContext(RecipesContext);

  return (
    <div>
      <Recipes recipe={ meals } isLoading={ isLoading } />
      <Footer />
    </div>
  );
}
export default Meals;
