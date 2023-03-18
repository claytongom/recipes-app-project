import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import RecipesProvider from '../../context/RecipesProvider';
import theme from '../../styles/theme';

const renderWithRouterAndContextProvider = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <ThemeProvider theme={ theme }>
        <RecipesProvider>
          <Router history={ history }>{component}</Router>
        </RecipesProvider>
        ,
      </ThemeProvider>,
    ),
    history,
  };
};
export default renderWithRouterAndContextProvider;
