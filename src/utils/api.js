// @flow

import { Pokedex } from 'pokeapi-js-wrapper';
import type {
  GETPokemonsFromServer, PokemonNames, GETPokemonFromServer, Pokemon,
} from '../types/pokemons';
import { clearPokemon } from '../types/pokemons';

export default function api() {
  const pokedex = new Pokedex({
    protocol: 'https',
  });

  async function getPokemonsList(): Promise<PokemonNames> {
    const pokemons: GETPokemonsFromServer = await pokedex.getPokemonsList();
    return pokemons.results.map((element => element.name));
  }

  async function getPokemonByName(name: string): Promise<Pokemon> {
    const pokemonApi: GETPokemonFromServer = await pokedex.getPokemonByName(name);
    return clearPokemon(pokemonApi);
  }

  return {
    getPokemonsList,
    getPokemonByName,
  };
}
