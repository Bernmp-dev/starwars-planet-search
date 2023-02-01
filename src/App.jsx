import React from 'react';
import './App.css';
import Table from './Components/Table';
import CallApi from './context/PlanetsApiProvider';

function App() {
  return (
    <CallApi>
      <Table />
    </CallApi>
  );
}

export default App;
