import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const CallApiContext = createContext();

function CallApi({ children }) {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlanets = async () => {
    const URL = 'https://swapi.dev/api/planets';
    setIsLoading(true);
    const response = await (await fetch(URL)).json();
    const withoutResidents = response.results.map((item) => {
      delete item.residents;
      return item;
    });
    setPlanets(withoutResidents);
    setIsLoading(false);
  };

  const values = useMemo(() => ({
    planets, fetchPlanets, isLoading, setIsLoading,
  }), [planets, isLoading, setIsLoading]);

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
