// @flow

import { createAction } from 'redux-actions';
import api from '../utils/api';
import type { PokemonNames } from '../types/pokemons';

export const fetchPokemonNamesRequest = createAction('POKEMON_NAMES_FETCH_REQUEST');
export const fetchPokemonNamesSuccess = createAction('POKEMON_NAMES_FETCH_SUCCESS');
export const fetchPokemonNamesFailure = createAction('POKEMON_NAMES_FETCH_FAILURE');

export const fetchPokemonNames = () => async (dispatch: (any) => void) => {
  dispatch(fetchPokemonNamesRequest());
  try {
    const pokemonNames: PokemonNames = await api().getPokemonsList();
    dispatch(fetchPokemonNamesSuccess({ pokemonNames }));
  } catch (e) {
    dispatch(fetchPokemonNamesFailure());
  }
};

export const fetchPokemonsRequest = createAction('POKEMONS_FETCH_REQUEST');
export const fetchPokemonsSuccess = createAction('POKEMONS_FETCH_SUCCESS');
export const fetchPokemonsFailure = createAction('POKEMONS_FETCH_FAILURE');

export const fetchPokemons = (pokemonNames: PokemonNames) => async (dispatch: (any) => void) => {
  dispatch(fetchPokemonsRequest());
  try {
    const promises = pokemonNames.map(async (element) => {
      const pokemon = await api().getPokemonByName(element);
      return pokemon;
    });
    const pokemons = await Promise.all(promises);
    dispatch(fetchPokemonsSuccess({ pokemons }));
  } catch (e) {
    dispatch(fetchPokemonsFailure);
  }
};

export const changePage = createAction('POKEMON_LIST_CHANGE_PAGE');
export const changeItemsCountPerPage = createAction('POKEMON_LIST_CHANGE_ITEMS_COUNT_PER_PAGE');

export const addPokemonToCompare = createAction('POKEMON_ADD_TO_COMPARE');

export const deletePokemonFromComparison = createAction('POKEMON_DELETE_FROM_COMPARISON');
