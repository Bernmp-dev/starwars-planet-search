import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { CallApiContext } from '../context/PlanetsApiProvider';
// import PropTypes from 'prop-types';

function Table() {
  const { planets, fetchPlanets } = useContext(CallApiContext);
  const [nameFilter, setNameFilter] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [amount, setAmount] = useState(0);
  // const [isClicked, setClick] = useState(false);
  const [numberFilter, setNumberFilter] = useState(planets);
  const [filtersArray, setFiltersArray] = useState([]);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const filteredPlanets = planets.filter(({ name }) => name.includes(nameFilter));

  const handleFilters = (filtersArray.length > 0 ? numberFilter : filteredPlanets);

  const columnFilter = () => {
    const obj = [`${column}`, `${comparison}`, `${amount}`];
    setFiltersArray([...filtersArray, obj]);
    const filtered = handleFilters.filter((p) => {
      switch (comparison) {
      case 'maior que':
        return Number(p[column]) > amount;
      case 'menor que':
        return Number(p[column]) < amount;
      case 'igual a':
        return Number(p[column]) === amount;
      default:
        return p;
      }
    });
    setNumberFilter(filtered);
  };

  return (
    <form>
      <input
        type="text"
        name="nameFilter"
        data-testid="name-filter"
        value={ nameFilter }
        onChange={ ({ target }) => setNameFilter(target.value) }
        placeholder="Search"
      />
      <br />
      <br />
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => setColumn(target.value) }
        defaultValue="population"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => setComparison(target.value) }
        defaultValue="maior que"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        onChange={ ({ target }) => setAmount(+target.value) }
        defaultValue="0"
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => columnFilter() }
      >
        Filtrar
      </button>
      <ul>
        {filtersArray.map((filter, index) => (
          <li key={ index }>
            { `${filter[0]} ${filter[1]} ${filter[2]}` }
            <button type="button">
              <AiOutlineDelete />
            </button>
          </li>
        ))}
      </ul>
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
          {handleFilters.map((planet, i) => (
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
