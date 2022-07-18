import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { setupServer } from './setupServer';

interface RenderOptions {
  route: string
  path?: string
}
    
export const setupTests = () => {
  const { server, serverState } = setupServer();
  
  function renderWithProvider(
    children: React.ReactChild,
    { route, path }: RenderOptions = { route: '/', path: '' }
  ) {
    const history = createMemoryHistory()
    history.push(route)
    return render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          {path ? (
            <Routes>
              <Route path={path}>{children}</Route>
            </Routes>
          ) : (
            children
          )}
        </HistoryRouter>
      </Provider>
    )
  }

  return {
    store,
    serverState,
    server,
    renderWithProvider,
  }
}
