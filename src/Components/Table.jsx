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

  const [order, setOrder] = useState({ sort: 'ASC', column: 'population', array: [] });

  const newOpt = options.filter((option) => option !== column);
  const [numericFilter, setNumericFilter] = useState([]);

  const columnsArray = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter',
    'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population',
    'Films', 'Created', 'Edited', 'URL'];
  const columnSort = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  useEffect(() => {
    fetchPlanets();
  }, []);

  useEffect(() => {
    setNumericFilter(planets);
  }, [planets]);

  const filterByText = () => {
    const planetsBySearch = planets.filter(({ name }) => name.includes(nameFilter));
    setNumericFilter(planetsBySearch);
  };

  useEffect(() => {
    filterByText();
  }, [nameFilter]);

  const handleComparison = (col, comp, amou, p) => {
    if (comp === 'maior que') {
      return +p[col] > +amou;
    }
    if (comp === 'menor que') {
      return +p[col] < +amou;
    }
    return +p[col] === +amou;
  };

  const handleSetFilters = () => {
    const filtered = planets.filter((plan) => (
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
    const unknown = numericFilter.filter((e) => e.population === 'unknown');
    const newOrder = numericFilter.filter((e) => e.population !== 'unknown')
      .concat(unknown);

    const ordered = newOrder.sort((a, b) => {
      if (order.sort === 'ASC') {
        return +a[order.column] - +b[order.column];
      }
      return +b[order.column] - +a[order.column];
    });

    // console.log(newOrder);
    setOrder({ ...order, array: ordered });
  };

  useEffect(() => {
    setNumericFilter(order.array);
  }, [order.array]);

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
        {columnSort.map((item, i) => (<option key={ i } value={ item }>{item}</option>))}
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
              data-testid="remove-list-filter"
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
          <tr data-testid="head-tr">
            {columnsArray.map((item, i) => (<th key={ i }>{item}</th>))}
          </tr>
        </thead>
        <tbody>
          {numericFilter.map((planet, i) => (
            <tr key={ i }>
              <td data-testid="planet-name">{planet.name}</td>
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
