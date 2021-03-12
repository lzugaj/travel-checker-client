import React, { Component } from 'react';

import MapManager from './containers/MapManager/MapManager';

import classes from './App.css';

class App extends Component {
  render() {
    return(
      <div className={classes.App}>
        <MapManager />
      </div>
    );
  }
}

export default App;