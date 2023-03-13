import renderWithRouterAndContextProvider from './helpers/renderWithRouterAndContextProvider';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import { act } from 'react-dom/test-utils';
import { screen, waitFor } from '@testing-library/react';

describe('Teste da página Recipe Details', () => {
  beforeEach(async () => {
    global.fetch = jest.fn(fetch);
  });

  test('should first', async () => {
    const { history } = renderWithRouterAndContextProvider(<App />);
    act(() => {
      history.push('/drinks/178319');
    });

    await waitFor(() => {
      screen.getByText('Aquamarine');
    });
  });
});
