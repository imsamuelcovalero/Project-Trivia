import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Game from '../pages/Game';

class Content extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/Game" component={ Game } />
      </Switch>
    );
  }
}

export default Content;
