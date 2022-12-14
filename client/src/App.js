import './App.css';
import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';

import Feed from './Feed';

function App() {

  const [ posts, setPosts ] = useState([])

  useEffect(()=>{
    fetch('/posts')
    .then(res => res.json())
    .then(data => setPosts(data))
  },[])



  return (
    <div className="App">
      

      <Switch>

        <Route exact path='/'>
          <Login />          
        </Route>

        <Route exact path='/signup'>
          <Signup />          
        </Route>

        <Route exact path='/feed'>
          <Feed posts={posts} />          
        </Route>

      </Switch>

    </div>
  );
}

export default App;
