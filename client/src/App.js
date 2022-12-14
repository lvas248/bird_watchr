import './App.css';
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <div className="App">
      <Switch>

        <Route exact path='/'>
          <Login />          
        </Route>

        <Route exact path='/signup'>
          <Signup />          
        </Route>

      </Switch>

    </div>
  );
}

export default App;
