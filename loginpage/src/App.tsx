/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/login/Login';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
