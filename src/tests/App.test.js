import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import App from '../App';
import CallApi from '../context/PlanetsApiProvider';
import mockPlanets from './MockPlanets';
import fetchPlanets from '../services/planetsAPI';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

describe('Testes aplicacao StarWars', () => {
  
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockPlanets)
    })
  })

  test('1 - Verificando se os inputs estao na tela', async () => {
    render(<App />);
    
    const searchBar = screen.getByRole('textbox');
    const columnInput = screen.getByTestId('column-filter');
    const comparisonInput = screen.getByTestId('comparison-filter');
    const valueInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter')
    const ascRadio = screen.getByTestId('column-sort-input-asc')
    const descRadio = screen.getByTestId('column-sort-input-desc')
    const sortButton = screen.getByTestId('column-sort-button')
    const orderButton = screen.getByTestId('button-remove-filters')
    expect(screen.getByTestId('column-sort')).toBeInTheDocument();

    
    const allInputs = [searchBar, columnInput, comparisonInput, valueInput, 
      filterButton, ascRadio, descRadio, sortButton, orderButton];
      
      allInputs.forEach((e) => {
        expect(e).toBeInTheDocument()
      })

  });
  test('2 - Verificando se a Table foi renderizada', async () => {
    render(<App />);
    
    const table = screen.getByRole('table'); 
    const allPlanets = await screen.findAllByTestId('planet-name')
    
    expect(table).toBeInTheDocument();
    allPlanets.forEach((planet) => {
      expect(planet).toBeInTheDocument();
    });
    expect(allPlanets).toHaveLength(10);

    const tableHeader = await screen.findByTestId('head-tr');
    expect(tableHeader.childElementCount).toBe(13);
  });
  test('3 - Deve retornar os resultados da API', async () => {
    let planets = [];
    await act(async () => {
      planets = await fetchPlanets();
    });
    expect(planets).toEqual(mockPlanets.results);
  });
  test('4 - Tratar erros na chamada da API', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise
      .reject(new Error('API error')));

    let error = null;
    try {
      await fetchPlanets();
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new Error('API error'));
  });
  test('5 - Atualizacao do filtro de nomes', () => {
    render(<App />);

    const nameFilter = screen.getByTestId('name-filter');
    fireEvent.change(nameFilter, { target: { value: 'Alderaan' } });
    expect(nameFilter.value).toBe('Alderaan');
  });
  test('6 - Atualizacao no column filter', () => {
    render(<App />);
    const columnFilter = screen.getByTestId('column-filter');
    fireEvent.change(columnFilter, { target: { value: 'population' } });
    expect(columnFilter.value).toBe('population');
  });
  test('7 - Atualizacao no comparison filter', () => {
    render(<App />);
    const comparisonFilter = screen.getByTestId('comparison-filter');
    fireEvent.change(comparisonFilter, { target: { value: 'maior que' } });
    expect(comparisonFilter.value).toBe('maior que');
  });
  it('8 - Atualizacao no value filter', () => {
    render(<App />);
    const valueFilter = screen.getByTestId('value-filter');
    fireEvent.change(valueFilter, { target: { value: '1000' } });
    expect(valueFilter.value).toBe('1000');
  });
  test('9 - Atualizacao no column filter de igualde', async () => {
    render(<App />);
      await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

      let row = await screen.findAllByTestId('planet-name');
      expect(row.length).toEqual(10);

      const columnFilter = screen.getByTestId('column-filter');
      const comparisonFilter = screen.getByTestId('comparison-filter');
      const valueFilter = screen.getByTestId('value-filter');
      const filterButton = screen.getByTestId('button-filter')  
      
      userEvent.selectOptions(columnFilter, columnFilter[3]);
      userEvent.selectOptions(comparisonFilter, comparisonFilter[2]);
      userEvent.type(valueFilter, '23');
      userEvent.click(filterButton);

      row = await screen.findAllByTestId('planet-name');
      expect(row.length).toEqual(3);
  });
  test('10 - Atualizacao no column filter "menor que"', async () => {
    render(<App />);
      await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

      let row = await screen.findAllByTestId('planet-name');
      expect(row.length).toEqual(10);

      const columnFilter = screen.getByTestId('column-filter');
      const comparisonFilter = screen.getByTestId('comparison-filter');
      const valueFilter = screen.getByTestId('value-filter');
      const filterButton = screen.getByTestId('button-filter')  
      
      userEvent.selectOptions(columnFilter, columnFilter[0]);
      userEvent.selectOptions(comparisonFilter, comparisonFilter[1]);
      userEvent.type(valueFilter, '1001');
      userEvent.click(filterButton);

      row = await screen.findAllByTestId('planet-name');
      expect(row.length).toEqual(1);
  });
  test('11 - Atualizacao no column filter "maior que"', async () => {
    render(<App />);
      await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

      let row = await screen.findAllByTestId('planet-name');
      expect(row.length).toEqual(10);

      const columnFilter = screen.getByTestId('column-filter');
      const comparisonFilter = screen.getByTestId('comparison-filter');
      const valueFilter = screen.getByTestId('value-filter');
      const filterButton = screen.getByTestId('button-filter')  
      
      userEvent.selectOptions(columnFilter, columnFilter[1]);
      userEvent.selectOptions(comparisonFilter, comparisonFilter[0]);
      userEvent.type(valueFilter, '5000');
      userEvent.click(filterButton);

      row = await screen.findAllByTestId('planet-name');
      expect(row.length).toEqual(1);
  });
  test('12 - Atualizacao no order filter', async () => {
    render(<App />);
      await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

      let row = await screen.findAllByTestId('planet-name');
      expect(row.length).toEqual(10);

      const columnOrder = screen.getByTestId('column-sort');
      const descRadio = screen.getByTestId('column-sort-input-desc');
      const ascRadio = screen.getByTestId('column-sort-input-asc');
      const orderButton = screen.getByTestId('column-sort-button');
      
      userEvent.selectOptions(columnOrder, columnOrder[0]);
      userEvent.click(descRadio);
      userEvent.click(orderButton);

      row = await screen.findAllByTestId('planet-name');
      expect(row[0]).toHaveTextContent('Coruscant');

      userEvent.selectOptions(columnOrder, columnOrder[0]);
      userEvent.click(ascRadio);
      userEvent.click(orderButton);

      row = await screen.findAllByTestId('planet-name');
      expect(row[0]).toHaveTextContent('Yavin IV');
  });
  test('13 - Botao de apagar todos os filtros', async () => {
    render(<App />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    let row = await screen.findAllByTestId('planet-name');

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter')  
    
    userEvent.selectOptions(columnFilter, columnFilter[3]);
    userEvent.selectOptions(comparisonFilter, comparisonFilter[2]);
    userEvent.type(valueFilter, '23');
    userEvent.click(filterButton);

    row = await screen.findAllByTestId('planet-name');
    expect(row.length).toEqual(3);

    const removeFilters = screen.getByTestId('button-remove-filters');
    userEvent.click(removeFilters);


    row = await screen.findAllByTestId('planet-name');
    expect(row.length).toEqual(10);
  });
  test('12 - Botao de apagar apenas um filtro da lista de filtros', async () => {
    render(<App />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    let row = await screen.findAllByTestId('planet-name');

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter')  
    
    userEvent.selectOptions(columnFilter, columnFilter[3]);
    userEvent.selectOptions(comparisonFilter, comparisonFilter[2]);
    userEvent.type(valueFilter, '23');
    userEvent.click(filterButton);

    row = await screen.findAllByTestId('planet-name');
    expect(row.length).toEqual(3);

    const filterList = screen.getByTestId('filter');
    expect(filterList).toBeInTheDocument()

    const removeList = screen.getByTestId('remove-list-filter');
    expect(removeList).toBeInTheDocument();

    userEvent.click(removeList);
    expect(removeList).not.toBeInTheDocument()
  });
})
