// @flow

import React from 'react';
import {
  Card,
} from 'semantic-ui-react';
import _ from 'lodash';
import ComparablePokemonCardContainer from '../containers/ComparablePokemonCard';


type Props = {
  pokemonsToCompare: {},
};
type State = {};

export default class ComparablePokemonList extends React.Component<Props, State> {
  render() {
    return (
      <Card.Group itemsPerRow={6}>
        {_.values(this.props.pokemonsToCompare).map(value => (
          <ComparablePokemonCardContainer comparablePokemon={value} />
        ))}
      </Card.Group>
    );
  }
}
