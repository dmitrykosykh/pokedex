// @flow

import React from 'react';
import {
  Tab, Container, Label, Menu,
} from 'semantic-ui-react';
import PokemonListContainer from '../containers/PokemonList';
import ComparablePokemonListContainer from '../containers/ComparablePokemonList';

type Props = {
  pokemonsCountToCompare: number,
};

type State = {};

export default class Pokedex extends React.Component<Props, State> {
  render() {
    const panes = [
      {
        menuItem: 'Список покемонов',
        render: () => (
          <Tab.Pane>
            <PokemonListContainer />
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item key="pokemonsToCompare">
              Сравнение покемонов
            <Label color="red">{this.props.pokemonsCountToCompare}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <ComparablePokemonListContainer />
          </Tab.Pane>
        ),
      },
    ];
    return (
      <Container>
        <Tab panes={panes} />
      </Container>
    );
  }
}
