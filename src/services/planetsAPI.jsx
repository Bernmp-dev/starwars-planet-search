const URL = 'https://swapi.dev/api/planets';

const fetchPlanets = async () => {
  const response = await (await fetch(URL)).json();
  return response.results;
};

export default fetchPlanets;
