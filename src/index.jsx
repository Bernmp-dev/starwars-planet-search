import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppProvider from './context/AppProvider';
import CallApi from './context/PlanetsApiProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <CallApi>
      <AppProvider>
        <App />
      </AppProvider>
    </CallApi>,
  );
