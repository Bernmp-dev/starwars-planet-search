import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const CallApiContext = createContext();

function CallApi({ children }) {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const fetchPlanets = async () => {
    const URL = 'https://swapi.dev/api/planets';
    try {
      setIsLoading(true);
      const response = await (await fetch(URL)).json();
      if (!response.results) {
        const newError = 'Elemento nao encontrado';
        throw newError;
      }
      const withoutResidents = response.results.map((item) => {
        delete item.residents;
        return item;
      });
      setPlanets(withoutResidents);
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  const values = useMemo(() => ({
    planets, fetchPlanets, isLoading, setIsLoading, errors,
  }), [planets, isLoading, setIsLoading, errors]);

  return (
    <CallApiContext.Provider value={ values }>
      { children }
    </CallApiContext.Provider>
  );
}

CallApi.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CallApi;
