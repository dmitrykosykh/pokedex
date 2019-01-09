// @flow

import React from 'react';
import {
  Item, Pagination, Dropdown, Grid, Loader,
} from 'semantic-ui-react';
import type { Node } from 'react';
import _ from 'lodash';
import type {
  PokemonNames, Pokemon,
} from '../types/pokemons';
import PokemonCardContainer from '../containers/PokemonCard';

type Props = {
  pokemonNames: PokemonNames,
  pokemonsFetchingState: 'requested' | 'failed' | 'succeeded' | 'none',
  pokemonNamesFetchingState: 'requested' | 'failed' | 'succeeded' | 'none',
  pokemons: Array<Pokemon>,
  activePage: number,
  totalPages: number,
  startIndex: number,
  itemsCountPerPage: number,
  changeItemsCountPerPage: (itemsCountPerPage: { itemsCountPerPage: number }) => void,
  changePage: (page: { page: number }) => void,
  fetchPokemons: (pokemonNames: PokemonNames) => void,
  optionsDropdown: {},
};

type State = {
};

export default class PokemonList extends React.Component<Props, State> {
  idIntervalLoadPokemons = undefined;

  componentDidMount() {
    this.idIntervalLoadPokemons = setInterval(this.loadPokemons);
  }

  loadPokemons = () => {
    if (this.props.pokemonNamesFetchingState === 'succeeded') {
      this.props.fetchPokemons(this.props.pokemonNames.slice(this.props.startIndex, this.props.startIndex + this.props.itemsCountPerPage));
      clearInterval(this.idIntervalLoadPokemons);
    }
  }

  handleChangePage = (event: SyntheticEvent<HTMLElement>, data: { activePage: number }) => {
    this.props.changePage({ page: data.activePage });
    this.idIntervalLoadPokemons = setInterval(this.loadPokemons);
  }

  handleChangeItemsCountPerPage = (event: SyntheticEvent<HTMLElement>, data: { value: number }) => {
    this.props.changeItemsCountPerPage({ itemsCountPerPage: data.value });
    this.idIntervalLoadPokemons = setInterval(this.loadPokemons);
  }

  renderPokemons = () => {
    switch (this.props.pokemonsFetchingState) {
      case 'none':
        return null;
      case 'requested':
        return <Loader active inline="centered" />;
      case 'failed':
        return null;
      case 'succeeded':
        return (
          <Item.Group divided>
            {this.props.pokemons.map<Node>((element, index) => (
              <PokemonCardContainer
                pokemon={element}
                index={index + this.props.startIndex + 1}
                key={_.uniqueId(element)}
              />
            ))}
          </Item.Group>
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <React.Fragment>
        <Grid container columns={2}>
          <Grid.Column>
            <Pagination
              activePage={this.props.activePage}
              boundaryRange={0}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              siblingRange={3}
              totalPages={this.props.totalPages}
              onPageChange={this.handleChangePage}
              nextItem={{ content: 'next' }}
              prevItem={{ content: 'previous' }}
            />
          </Grid.Column>
          <Grid.Column>
            <Dropdown
              selection
              defaultValue={this.props.optionsDropdown[1].value}
              wrapSelection={false}
              options={this.props.optionsDropdown}
              onChange={this.handleChangeItemsCountPerPage}
            />
          </Grid.Column>
        </Grid>
        {this.renderPokemons()}
      </React.Fragment>
    );
  }
}
