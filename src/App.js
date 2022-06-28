import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/game" component={ Game } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
