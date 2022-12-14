import './App.css';
import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';
import Navbar from './Navbar';
import Feed from './Feed';

function App() {

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



  return (
    <div className="App">
      
      <Navbar user={user}/>

      <div id='switch_container'>

        <Switch>

          <Route exact path='/'>
            <Feed posts={posts} />          
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
