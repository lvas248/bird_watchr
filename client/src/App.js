import './App.css';
import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';
import Navbar from './Navbar';
import Feed from './Feed';

function App() {
  console.log('App trigger')
  const [ user, setUser ] = useState({})
  const [ posts, setPosts ] = useState([])

  useEffect(()=>{
    fetch('/posts')
    .then(res => res.json())
    .then(data => setPosts(data))
  },[])

  function updateUser(userObj){
    setUser(userObj)
  }
  function removeUser(){
    setUser({})
  }


  return (
    <div className="App">
      
      <Navbar user={user} removeUser={removeUser}/>

      <div id='switch_container'>

        <Switch>

          <Route path='/feed'>
            <Feed posts={posts} user={user} />          
          </Route>

          <Route  path='/login'>
            <Login updateUser={updateUser}/>          
          </Route>

          <Route path='/signup'>
            <Signup updateUser={updateUser}/>          
          </Route>


        </Switch>
      </div>


    </div>
  );
}

export default App;
