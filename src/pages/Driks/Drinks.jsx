import React, { useContext } from 'react';
import Footer from '../../components/Footer';
import Recipes from '../Recipes';
import { RecipesContext } from '../../context/RecipesProvider';
import Header from '../../components/Header';

function Drinks() {
  const { drinks, isLoading } = useContext(RecipesContext);

  return (
    <div>
      <Header />
      <Recipes recipe={ drinks } isLoading={ isLoading } />
      <Footer />
    </div>
  );
}
export default Drinks;
