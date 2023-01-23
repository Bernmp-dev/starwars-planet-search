import React from 'react';
import './App.css';
import NewComponent from './Components/NewComponent';
import Context from './context/Context';

function App() {
  return (
    <Context.Provider value={ { teste: ' Online 🔵' } }>
      <NewComponent />
    </Context.Provider>
  );
}

export default App;
