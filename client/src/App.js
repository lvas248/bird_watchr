import './App.css';
import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';
import Navbar from './Navbar';
import NewPost from './NewPost';
import MyStuff from './MyStuff';
// import Alert from './Alert';
import MyFeed from './MyFeed';


export const UserContext = React.createContext()

function App() {

  const [ user, setUser ] = useState(null)
  const [ birds, setBirds ] = useState([])


  useEffect(()=>{
    fetch('/birds')
    .then(res => res.json())
    .then(data => setBirds(data))
  },[])

  useEffect(()=>{
    fetch('/me')
    .then(res => {
      if(res.ok){
        res.json().then(data => setUser(data))
      }
    })
  },[])
      
  function createUniqueBirdsArray(birdsArray){
    //takes an array of birds with duplicates and returns a unique array, alphebatized
      //create a unique array of birds using Map dataset
    const birdMap = new Map(birdsArray.map( birdObj => [birdObj['id'], birdObj]))
    let updatedBirds =  [...birdMap.values()]
      //alphabetize array by bird name
    updatedBirds = ([...birdMap.values()].sort( (a,b) => {
      if(a.name < b.name) return -1
      else if(a.name > b.name) return 1
      else return 0
    }))
  return updatedBirds
  }

  function updateBirds(newBirdArray){
    setBirds(newBirdArray)
  }

  // function updateBirdsList(userBirds){
  //   const birdsList = birds.concat(userBirds)
  //   setBirds(createUniqueBirdsArray(birdsList))
  // }

  return (
    <UserContext.Provider value={ [user, setUser] }>
    <div className="App">
      
      <Navbar />

      <div id='switch_container'>

        <Switch>

          <Route exact path='/my-posts'>

            <MyFeed 
              birds={birds} 
            />

          </Route>
          

          <Route path='/new-post'>

              <NewPost 
                birds={birds}
                updateBirds={updateBirds} 
              />
         
          </Route>


          <Route path='/my-stuff'>

              <MyStuff  />

          </Route> 


          <Route path='/signup'>

            <Signup />      

          </Route>          
          

          <Route path='/'>

            <Login />      

          </Route> 


        </Switch>
      </div>


    </div>
        </UserContext.Provider>

  );
}

export default App;
