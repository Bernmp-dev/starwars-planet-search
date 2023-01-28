import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { CallApiContext } from '../context/PlanetsApiProvider';
// import PropTypes from 'prop-types';

function Table() {
  const { planets, fetchPlanets } = useContext(CallApiContext);
  const [nameFilter, setNameFilter] = useState('');
  const [comparison, setComparison] = useState('maior que');
  const [amount, setAmount] = useState(0);
  const [column, setColumn] = useState('population');
  const [numericFilter, setNumericFilter] = useState(planets);
  const [filtersArray, setFiltersArray] = useState([]);
  const [options, setOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const filteredPlanets = planets.filter(({ name }) => name.includes(nameFilter));

  const handleFilters = (filtersArray.length > 0 ? numericFilter : filteredPlanets);

  const newOpt = options.filter((option) => !option.includes(column));

  const handleSetFilters = () => {
    const filtered = handleFilters.filter((p) => {
      switch (comparison) {
      case 'maior que':
        return p[column] > +amount;
      case 'menor que':
        return p[column] < +amount;
      case 'igual a':
        return p[column] === +amount;
      default:
        return p;
      }
    });
    setNumericFilter(filtered);
  };

  const columnFilter = () => {
    const obj = [`${column}`, `${comparison}`, `${amount}`];
    setFiltersArray([...filtersArray, obj]);
    setOptions(newOpt);
    setColumn(newOpt[0]);
    handleSetFilters();
  };

  const handleRemoveFilter = (name) => {
    const newFilters = filtersArray.filter((item) => !item.includes(name));
    console.log(newFilters);
    setFiltersArray(newFilters);
    options.unshift(name);

    setNumericFilter(planets);

    newFilters.forEach((e) => {
      setColumn(e[0]);
      setComparison(e[1]);
      setAmount(+e[2]);
      handleSetFilters();
    });
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
        defaultValue={ options[0] }
      >
        {options.map((option) => (
          <option key={ option } value={ option }>
            {option}
          </option>
        ))}
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
        disabled={ filtersArray.length >= 5 }
      >
        Filtrar
      </button>
      <ul>
        {filtersArray.map((filter) => (
          <li key={ filter[0] } data-testid="filter">
            { `${filter[0]} ${filter[1]} ${filter[2]}` }
            <button
              type="button"
              onClick={ () => handleRemoveFilter(filter[0]) }
              data-testid="button-remove-filters"
            >
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
