import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import RecipesProvider from './context/RecipesProvider';
import * as serviceWorker from './serviceWorker';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider theme={ theme }>
      <RecipesProvider>
        <GlobalStyle />
        <App />
      </RecipesProvider>
    </ThemeProvider>
  </BrowserRouter>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
