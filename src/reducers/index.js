// @flow

import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import _ from 'lodash';
import * as actions from '../actions';
import type { Pokemon, PokemonNames, ComparablePokemon } from '../types/pokemons';

const pokemonNamesFetchingState = handleActions({
  [actions.fetchPokemonNamesRequest]() {
    return 'requested';
  },
  [actions.fetchPokemonNamesFailure]() {
    return 'failed';
  },
  [actions.fetchPokemonNamesSuccess]() {
    return 'succeeded';
  },
}, 'none');

const pokemonNames = handleActions(new Map(
  [
    [
      actions.fetchPokemonNamesSuccess,
      (state: PokemonNames, action: { payload: { pokemonNames: PokemonNames } }) => action.payload.pokemonNames,
    ],
  ],
), []);

const pokemonsFetchingState = handleActions({
  [actions.fetchPokemonsRequest]() {
    return 'requested';
  },
  [actions.fetchPokemonsFailure]() {
    return 'failed';
  },
  [actions.fetchPokemonsSuccess]() {
    return 'succeeded';
  },
  [actions.changePage]() {
    return 'requested';
  },
  [actions.changeItemsCountPerPage]() {
    return 'requested';
  },
}, 'none');

const pokemons = handleActions(new Map(
  [
    [
      actions.fetchPokemonsSuccess,
      (state, action: { payload: { pokemons: Array<Pokemon> } }) => action.payload.pokemons,
    ],
    [
      actions.changePage,
      () => [],
    ],
    [
      actions.changeItemsCountPerPage,
      () => [],
    ],
  ],
), []);

export const optionsDropdown = [
  { key: 1, text: '5 rows', value: 5 },
  { key: 2, text: '10 rows', value: 10 },
  { key: 3, text: '15 rows', value: 15 },
  { key: 4, text: '20 rows', value: 20 },
];

export const evalTotalPages = (itemsCountPerPage: number, pokemonsCount: number): number => Math.ceil(pokemonsCount / itemsCountPerPage);

export const evalStartIndex = (itemsCountPerPage: number, activePage: number): number => itemsCountPerPage * (activePage - 1);

const pokemonListUIState = handleActions(new Map(
  [
    [
      actions.fetchPokemonNamesSuccess,
      (state, action: { payload: { pokemonNames: PokemonNames } }) => {
        const newTotalPages = evalTotalPages(state.itemsCountPerPage, action.payload.pokemonNames.length);
        return { ...state, totalPages: newTotalPages, pokemonsCount: action.payload.pokemonNames.length };
      },
    ],
    [
      actions.changePage,
      (state, action: { payload: { page: number } }) => {
        const newStartIndex = evalStartIndex(state.itemsCountPerPage, action.payload.page);
        return { ...state, startIndex: newStartIndex, activePage: action.payload.page };
      },
    ],
    [
      actions.changeItemsCountPerPage,
      (state, action: { payload: { itemsCountPerPage: number } }) => {
        const newTotalPages = evalTotalPages(action.payload.itemsCountPerPage, state.pokemonsCount);
        return {
          ...state, totalPages: newTotalPages, itemsCountPerPage: action.payload.itemsCountPerPage, activePage: 1, startIndex: 0,
        };
      },
    ],
  ],
), {
  pokemonsCount: 0,
  activePage: 1,
  totalPages: 0,
  startIndex: 0,
  itemsCountPerPage: optionsDropdown[1].value,
  optionsDropdown,
});

const pokemonsToCompare = handleActions(new Map(
  [
    [
      actions.addPokemonToCompare,
      (state, action: { payload: { pokemon: Pokemon, index: number } }) => ({ ...state, [action.payload.pokemon.name]: action.payload }),
    ],
    [
      actions.deletePokemonFromComparison,
      (state, action: { payload: ComparablePokemon }) => _.omit(state, action.payload.pokemon.name),
    ],
  ],
), {});

const pokedexUIState = handleActions(new Map(
  [
    [
      actions.addPokemonToCompare,
      state => ({ pokemonsCountToCompare: state.pokemonsCountToCompare + 1 }),
    ],
    [
      actions.deletePokemonFromComparison,
      state => ({ pokemonsCountToCompare: state.pokemonsCountToCompare - 1 }),
    ],
  ],
), { pokemonsCountToCompare: 0 });

export default combineReducers({
  pokemonNamesFetchingState,
  pokemonNames,
  pokemons,
  pokemonsFetchingState,
  pokemonListUIState,
  pokemonsToCompare,
  pokedexUIState,
});
