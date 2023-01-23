import React, { useContext } from 'react';
import Context from '../context/Context';

function NewComponent() {
  const { teste } = useContext(Context);
  return (
    <div>
      <span>
        Teste::
        { teste }
      </span>
    </div>
  );
}

export default NewComponent;
