// @flow

import React from 'react';
import {
  Card, Image, Button,
} from 'semantic-ui-react';
import _ from 'lodash';
import type { ComparablePokemon } from '../types/pokemons';

type Props = {
    comparablePokemon: ComparablePokemon,
    deletePokemonFromComparison: (comparablePokemon: ComparablePokemon) => void,
};

type State = {

};

const pStyle = {
  fontWeight: 700,
  color: 'black',
  fontSize: '15px',
};

export default class ComparablePokemonCard extends React.Component<Props, State> {
  handleDeletePokemon = () => {
    this.props.deletePokemonFromComparison(this.props.comparablePokemon);
  }

  render() {
    return (
      <Card centered>
        <Image src={this.props.comparablePokemon.pokemon.image} size="medium" />
        <Card.Content>
          <Card.Header>
            {`#${this.props.comparablePokemon.index.toString().padStart(3, '0')} ${_.upperFirst(this.props.comparablePokemon.pokemon.name)}`}
          </Card.Header>
          <Card.Description>
            <p style={pStyle}>Weight:</p>
            <p>{this.props.comparablePokemon.pokemon.weight}</p>
            <p style={pStyle}>Height:</p>
            <p>{this.props.comparablePokemon.pokemon.height}</p>
            <p style={pStyle}>Base experience:</p>
            <p>{this.props.comparablePokemon.pokemon.baseExperience}</p>
            <p style={pStyle}>Types:</p>
            <p>{this.props.comparablePokemon.pokemon.types.join(', ')}</p>
            <p style={pStyle}>Game Indices:</p>
            <p>{this.props.comparablePokemon.pokemon.gameIndices.join(', ')}</p>
            <p style={pStyle}>Stats:</p>
            <p>{this.props.comparablePokemon.pokemon.stats.join(', ')}</p>
            <p style={pStyle}>Abilities:</p>
            <p>{this.props.comparablePokemon.pokemon.abilities.join(', ')}</p>
            <p style={pStyle}>Held items:</p>
            <p>{this.props.comparablePokemon.pokemon.heldItems.join(', ')}</p>
            <p style={pStyle}>Moves:</p>
            <p>{this.props.comparablePokemon.pokemon.moves.join(', ')}</p>
            <p style={pStyle}>Order:</p>
            <p>{this.props.comparablePokemon.pokemon.order}</p>
          </Card.Description>
        </Card.Content>
        <Button icon="trash alternate" as="a" onClick={this.handleDeletePokemon} />
      </Card>
    );
  }
}
