import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route path="/profile" component={ Profile } />
      <Route
        path="/meals/:id/in-progress"
        render={ (props) => <RecipeInProgress { ...props } /> }
      />
      <Route
        path="/drinks/:id/in-progress"
        render={ (props) => <RecipeInProgress { ...props } /> }
      />
      <Route
        path="/meals/:id"
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      <Route path="/meals" component={ Meals } />
      <Route
        path="/drinks/:id"
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/" component={ Login } />
      <Route exact path="/header" component={ Header } />
      <Route exact path="/searchbar" component={ SearchBar } />
    </Switch>
  );
}

export default App;
