import { connect } from 'react-redux';
import Component from '../components/ComparablePokemonList';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const props = {
    pokemonsToCompare: state.pokemonsToCompare,
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;
