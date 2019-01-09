import { connect } from 'react-redux';
import Component from '../components/Pokedex';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const props = {
    ...state.pokedexUIState,
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;
