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
import FavoritesRecipes from './pages/FavoritesRecipes';

function App() {
  return (
    <Switch>
      <Route path="/profile" component={ Profile } />
      <Route path="/meals" component={ Meals } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoritesRecipes } />
      <Route exact path="/" component={ Login } />
      <Route exact path="/header" component={ Header } />
      <Route exact path="/searchbar" component={ SearchBar } />
    </Switch>
  );
}

export default App;
