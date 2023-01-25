import React, { useContext, useEffect, useState } from 'react';
import { CallApiContext } from '../context/PlanetsApiProvider';
// import PropTypes from 'prop-types';
// import AppContext from '../context/AppContext';
// import fetchPlanets from '../services/planetsAPI';

function Table() {
  const [nameFilter, setNameFilter] = useState('');
  const { planets,
    //  isLoading, setIsLoading, errors,
    fetchPlanets } = useContext(CallApiContext);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const filteredPlanets = planets.filter(({ name }) => name.includes(nameFilter));
  // const planetNames = [].concat(...filteredPlanets.map((p) => Object.keys(p))[0]);

  return (
    <form>
      <input
        type="text"
        name="nameFilter"
        data-testid="name-filter"
        value={ nameFilter }
        onChange={ ({ target }) => setNameFilter(target.value) }
        placeholder="                 Search"
      />
      <br />
      <br />
      {/* <select data-testid="column-filter" name="" id="">
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameterdiameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select name="" id="">
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
      </select> */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet, i) => (
            <tr key={ i }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
}

Table.propTypes = {};

export default Table;
