import { useMemo } from 'react';
import AppContext from './AppContext';
// import fetchPlanets from '../services/planetsAPI';

function AppProvider({ children }) {
  const values = useMemo(() => ({
    teste: ' Online 🔵',
    // isLoading: false,
  }), []);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

export default AppProvider;
