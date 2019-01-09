import { connect } from 'react-redux';
import Component from '../components/PokemonList';
import * as actionCreators from '../actions';
import { pokemonNamesSelector, pokemonsSelector } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    pokemonNames: pokemonNamesSelector(state),
    pokemons: pokemonsSelector(state),
    pokemonsFetchingState: state.pokemonsFetchingState,
    pokemonNamesFetchingState: state.pokemonNamesFetchingState,
    ...state.pokemonListUIState,
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;
