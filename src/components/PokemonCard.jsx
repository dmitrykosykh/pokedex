// @flow

import React from 'react';
import { Item, Button, Label } from 'semantic-ui-react';
import _ from 'lodash';
import type { Pokemon } from '../types/pokemons';

type Props = {
  index: number,
  pokemon: Pokemon,
  addPokemonToCompare: ({ pokemon: Pokemon, index: number }) => void,
  pokemonsToCompare: {},
};
type State = {};

export default class PokemonCard extends React.Component<Props, State> {
  addPokemonToCompare = () => {
    this.props.addPokemonToCompare({ pokemon: this.props.pokemon, index: this.props.index });
  }

  render() {
    return (
      <Item>
        <Item.Image size="tiny" src={this.props.pokemon.image} />
        <Item.Content>
          <Item.Header as="a">{`#${this.props.index.toString().padStart(3, '0')} ${_.upperFirst(this.props.pokemon.name)}`}</Item.Header>
          <Item.Meta></Item.Meta>
          <Item.Description>
            <p>
              {`Weight: ${this.props.pokemon.weight}`}
            </p>
            <p>
              {`Height: ${this.props.pokemon.height}`}
            </p>
            <p>{this.props.pokemon.types.map(v => _.upperFirst(v)).join(', ') }</p>
          </Item.Description>
          {
            _.has(this.props.pokemonsToCompare, this.props.pokemon.name)
              ? <Label size="large" color="yellow">Добавлен для сравнения</Label>
              : <Item.Extra><Button size="large" icon="plus" onClick={this.addPokemonToCompare} /></Item.Extra>
          }
        </Item.Content>
      </Item>
    );
  }
}
