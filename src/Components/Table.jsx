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
  const [filtersArray, setFiltersArray] = useState([]);
  const [options, setOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [order, setOrder] = useState({
    sort: 'ASC',
    column: 'population',
  });
  // const [click, setClick] = useState(0);

  const newOpt = options.filter((option) => option !== column);

  const planetsBySearch = planets.filter(({ name }) => name.includes(nameFilter));

  const [numericFilter, setNumericFilter] = useState(planets);
  const handleFilters = (filtersArray.length > 0 ? numericFilter : planetsBySearch);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const handleComparison = (col, comp, amou, p) => {
    switch (comp) {
    case 'maior que':
      return +p[col] > +amou;
    case 'menor que':
      return +p[col] < +amou;
    case 'igual a':
      return +p[col] === +amou;
    default:
      return false;
    }
  };

  const handleSetFilters = () => {
    const filtered = planetsBySearch.filter((plan) => (
      !filtersArray.some((curr) => !handleComparison(
        curr.column,
        curr.comparison,
        curr.amount,
        plan,
      ))
    ));
    setNumericFilter(filtered);
  };

  const handleAddFilter = () => {
    const obj = { column, comparison, amount };
    setFiltersArray([...filtersArray, obj]);

    setOptions(newOpt);
    setColumn(newOpt[0]);
  };

  const handleRemoveFilter = (columnName) => {
    const newFilters = filtersArray
      .filter(({ column: coluna }) => coluna !== columnName);

    setFiltersArray(newFilters);
    setOptions([...options, columnName]);
  };

  useEffect(() => {
    handleSetFilters();
  }, [filtersArray]);

  const filterByOrder = () => {
    const newOrder = handleFilters.sort((a, b) => {
      switch (order.sort) {
      case 'ASC':
        return +a[order.column] - +b[order.column];
      case 'DESC':
        return +b[order.column] - +a[order.column];
      default:
        return a - b;
      }
    });
    const minusOne = -1;
    newOrder.sort((a) => (a === 'unknown' ? minusOne : 1));
    setNumericFilter(newOrder);
  };

  const optionsLimit = 5;

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
        onClick={ () => handleAddFilter() }
        disabled={ filtersArray.length >= optionsLimit }
      >
        Filtrar
      </button>
      <select
        data-testid="column-sort"
        onChange={ ({ target }) => setOrder({ ...order, column: target.value }) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label htmlFor="ascRadio">
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          value="ASC"
          id="ascRadio"
          checked={ order.sort === 'ASC' }
          onChange={ ({ target }) => setOrder({ ...order, sort: target.value }) }
        />
        Ascendente
      </label>
      <label htmlFor="descRadio">
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          value="DESC"
          id="descRadio"
          checked={ order.sort === 'DESC' }
          onChange={ ({ target }) => setOrder({ ...order, sort: target.value }) }
        />
        Descendente
      </label>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ filterByOrder }
      >
        Ordenar
      </button>
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ () => setFiltersArray([]) }
      >
        Remover Filtros
      </button>
      <ul>
        {filtersArray.map((filter) => (
          <li key={ filter.column } data-testid="filter">
            { `${filter.column} ${filter.comparison} ${filter.amount}` }
            <button
              type="button"
              onClick={ () => handleRemoveFilter(filter.column) }
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
