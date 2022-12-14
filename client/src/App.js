import './App.css';
import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';
import Navbar from './Navbar';
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
      
      <Navbar />

      <div id='switch_container'>

        <Switch>

          <Route exact path='/'>
            <Feed posts={posts} />          
          </Route>

          <Route  path='/login'>
            <Login />          
          </Route>

          <Route path='/signup'>
            <Signup />          
          </Route>


        </Switch>
      </div>


    </div>
  );
}

export default App;
