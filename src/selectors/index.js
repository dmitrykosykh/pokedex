import { createSelector } from 'reselect';

export const getPokemonNamesSelector = state => state.pokemonNames;
export const getPokemonsSelector = state => state.pokemons;
export const pokemonNamesSelector = createSelector(
  getPokemonNamesSelector,
  pokemonNames => pokemonNames,
);

export const pokemonsSelector = createSelector(
  getPokemonsSelector,
  pokemons => pokemons,
);
