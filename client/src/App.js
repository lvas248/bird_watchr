import './App.css';
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login';

function App() {
  return (
    <div className="App">
      <Switch>
        
        <Route exact path='/'>
          <Login />          
        </Route>

      </Switch>

    </div>
  );
}

export default App;
