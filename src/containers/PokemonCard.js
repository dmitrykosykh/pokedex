import { connect } from 'react-redux';
import Component from '../components/PokemonCard';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const props = {
    ...state.pokemonCardUIState,
    pokemonsToCompare: state.pokemonsToCompare,
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;
