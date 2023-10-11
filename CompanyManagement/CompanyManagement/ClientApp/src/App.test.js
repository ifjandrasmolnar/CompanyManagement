import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

function renderApp() {
  const div = document.createElement('div');
  const root = createRoot(div);

  root.render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
  );

  return div;
}

it('renders without crashing', async () => {
  const appDiv = renderApp();
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  document.body.removeChild(appDiv);
});
