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

  function createUniqueUserBirdsFromCurrentPosts(updatedUserObj){
    //Takes in the userObj, grabs all of the bird objs used in user.posts, creates unique array of bird objs and sets as user.birds
      //Grab birdObjs from user.posts
    const birdsArray = updatedUserObj.posts.map( p => p.bird_info)
      //make it unique
    const uniqueBirds = createUniqueBirdsArray(birdsArray)
      //update userCopy.birds with unique birds list, return newly updated userObj
    return {...updatedUserObj, birds: uniqueBirds}

  }

  function updateBirdsList(newBirdObj){
    const birdsList = [...birds, newBirdObj]
    setBirds(createUniqueBirdsArray(birdsList))

  }

  return (
    <UserContext.Provider value={ [user, setUser] }>
    <div className="App">
      
      <Navbar />

      <div id='switch_container'>

        <Switch>

          <Route exact path='/my-posts'>

            <MyFeed 
              birds={birds} 
              createUniqueUserBirdsFromCurrentPosts={createUniqueUserBirdsFromCurrentPosts}
            />

          </Route>
          

          <Route path='/new-post'>

              <NewPost 
                birds={birds}
                createUniqueUserBirdsFromCurrentPosts={createUniqueUserBirdsFromCurrentPosts}
                updateBirdsList={updateBirdsList} 
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
