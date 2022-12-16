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
  const [ birds, setBirds ] = useState([])

  useEffect(()=>{
    fetch('/posts')
    .then(res => res.json())
    .then(data => setPosts(data))
  },[])
  useEffect(()=>{
    fetch('/birds')
    .then(res => res.json())
    .then(data => setBirds(data))
  },[])
  useEffect(()=>{
    fetch('/me')
    .then(res => res.json())
    .then(data => setUser(data))
  },[])

  function updateUser(userObj){
    setUser(userObj)
  }
  function removeUser(){
    setUser({})
  }

  function updateBird(birdObj){
    const updatedList = birds.map( bird =>{
      if(birdObj.id === bird.id) return birdObj
      else return bird
    })
    setBirds(updatedList)
  }


  return (
    <div className="App">
      
      <Navbar user={user} removeUser={removeUser}/>

      <div id='switch_container'>

        <Switch>

          <Route path='/feed'>
            <Feed posts={posts} user={user} birds={birds} updateBird={updateBird} />          
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
