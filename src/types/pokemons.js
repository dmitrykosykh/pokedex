// @flow

export type GETPokemonsFromServer = {
  count: number,
  results: Array<{ url: string, name: string }>
}

export type PokemonNames = Array<string>;

export type GETPokemonFromServer = {
  abilities: Array<{ ability: { name: string } }>,
  base_experience: number,
  game_indices: Array<{ version: { name: string } }>,
  height: number,
  held_items: Array<{ item: { name: string } }>,
  id: number,
  moves: Array<{ move: { name: string } }>,
  name: string,
  order: number,
  sprites: { front_default: string },
  stats: Array<{ stat: { name: string } }>,
  types: Array<{ type: { name: string } }>,
  weight: number
};

export type Pokemon = {
  abilities: Array<string>,
  baseExperience: number,
  gameIndices: Array<string>,
  height: number,
  heldItems: Array<string>,
  id: number,
  moves: Array<string>,
  name: string,
  order: number,
  image: string,
  stats: Array<string>,
  types: Array<string>,
  weight: number
};

export type ComparablePokemon = {
  index: number,
  pokemon: Pokemon
};

export function clearPokemon(options: GETPokemonFromServer): Pokemon {
  const abilities = options.abilities.map(element => element.ability.name);
  const baseExperience = options.base_experience;
  const gameIndices = options.game_indices.map(element => element.version.name);
  const {
    height, id, name, order, weight,
  } = options;
  const heldItems = options.held_items.map(element => element.item.name);
  const moves = options.moves.map(element => element.move.name);
  const image = options.sprites.front_default;
  const stats = options.stats.map(element => element.stat.name);
  const types = options.types.map(element => element.type.name);
  return {
    abilities,
    baseExperience,
    gameIndices,
    height,
    heldItems,
    id,
    moves,
    name,
    order,
    image,
    stats,
    types,
    weight,
  };
}
