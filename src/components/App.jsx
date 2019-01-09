// @flow

import React from 'react';
import PokedexContainer from '../containers/Pokedex';
import 'semantic-ui-css/semantic.css';

type Props = {};
type State = {};

export default class App extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <PokedexContainer />
      </div>
    );
  }
}
