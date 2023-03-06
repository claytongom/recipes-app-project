import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
<<<<<<< HEAD
=======
import RecipesProvider from './context/RecipesProvider';
import HeaderProvider from './context/HeaderProvider';
>>>>>>> main-group-25
import App from './App';
import RecipesProvider from './context/RecipesProvider';
import * as serviceWorker from './serviceWorker';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <RecipesProvider>
        <HeaderProvider>
          <App />
        </HeaderProvider>
      </RecipesProvider>
    </BrowserRouter>,
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
