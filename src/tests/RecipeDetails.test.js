import { act } from 'react-dom/test-utils';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndContextProvider from './helpers/renderWithRouterAndContextProvider';
import App from '../App';

describe('Teste da página Recipe Details', () => {
  beforeEach(async () => {
    const { history } = renderWithRouterAndContextProvider(<App />);

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest
        .fn()
        .mockResolvedValue(
          fetch(
            'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319',
          ),
        )
        .mockResolvedValueOnce(
          fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='),
        ),
    });

    act(() => {
      history.push('/drinks/178319');
    });

    screen.logTestingPlaygroundURL();
  });

  test('should first', () => {});
});
