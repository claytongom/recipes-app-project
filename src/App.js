import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import DoneRecipes from './pages/DoneRecipes';
import Header from './components/Header';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <Switch>
      <Route path="/profile" component={ Profile } />
      <Route path="/meals" component={ Recipes } />
      <Route path="/drinks" component={ Recipes } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/" component={ Login } />
      <Route exact path="/header" component={ Header } />
      <Route exact path="/searchbar" component={ SearchBar } />
    </Switch>
  );
}

export default App;
