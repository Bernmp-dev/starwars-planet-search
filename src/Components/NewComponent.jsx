import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function NewComponent() {
  const { teste } = useContext(AppContext);
  return (
    <div>
      <span>
        Teste:
        { teste }
      </span>
    </div>
  );
}

export default NewComponent;
