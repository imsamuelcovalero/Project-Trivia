import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Game from '../pages/Game';
import Settings from '../pages/Settings';
import Feedback from '../pages/Feedback';
import Ranking from '../pages/Ranking';

class Content extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/Game" component={ Game } />
        <Route exact path="/Settings" component={ Settings } />
        <Route exact path="/Feedback" component={ Feedback } />
        <Route exact path="/Ranking" component={ Ranking } />
      </Switch>
    );
  }
}

export default Content;
