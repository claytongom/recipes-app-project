import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

export default function Footer() {
  return (
    <footer
      style={ {
        position: 'fixed',
        bottom: '0px',
      } }
      data-testid="footer"
    >
      <Link to="/meals">
        <img src={ mealIcon } alt="Meal Icon" data-testid="meals-bottom-btn" />
      </Link>
      <Link to="/drinks">
        <img src={ drinkIcon } alt="Drink Icon" data-testid="drinks-bottom-btn" />
      </Link>
    </footer>
  );
}