import './App.css';
import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';
import Navbar from './Navbar';
import Feed from './Feed';
import NewPost from './NewPost';
import MyStuff from './MyStuff';
import Alert from './Alert';
import DisplayBird from './DisplayBird';
import MyFeed from './MyFeed';


export const UserContext = React.createContext()

function App() {

  const [ user, setUser ] = useState({})
  const [ birds, setBirds ] = useState([])


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

  function createUniqueUserBirdsFromCurrentPosts(userCopy){
  //Get an array of birds used in userCopy.posts, make it unique, update user.birds in global user object 
      //Array of birds from userCopy.posts
  const birdsArray = userCopy.posts.map( p => p.bird_info)
      //make it unique
  const birdMap = new Map(birdsArray.map( birdObj => [birdObj['id'], birdObj]))
  const uniqueBirdsArray = ([...birdMap.values()])
      //update userCopy.birds with unique birds list
  userCopy = {...userCopy, birds: uniqueBirdsArray}
  return userCopy
  }
  
  return (
    <UserContext.Provider value={ [user, setUser] }>
    <div className="App">
      
      <Navbar />

      <div id='switch_container'>

        <Switch>

          <Route exact path='/'>
            {/* <Feed 
              posts={posts} 
              user={user} 
              birds={birds} 
              updatePost={updatePost} 
              deletePost={deletePost} 
              addLikeToPosts={addLikeToPosts} 
              removeLikeFromPosts={removeLikeFromPosts}
              addCommentToPost={addCommentToPost}      
              deleteCommentFromPosts={deleteCommentFromPosts} 
              />    */}
              <MyFeed user={user} birds={birds} createUniqueUserBirdsFromCurrentPosts={createUniqueUserBirdsFromCurrentPosts} />
          </Route>

          <Route path='/new-post'>

              {user.username ? (
              <NewPost 
                birds={birds} />
              ):(<Alert />)}
          </Route>

          {/* <Route path='/my-stuff'> */}

            {/* {user.username ? (
                  <MyStuff 
                    user={user}
                    posts={posts}
                    birds={birds} 
                    updatePost={updatePost} 
                    deletePost={deletePost} 
                    addLikeToPosts={addLikeToPosts} 
                    removeLikeFromPosts={removeLikeFromPosts}
                    addCommentToPost={addCommentToPost}      
                    deleteCommentFromPosts={deleteCommentFromPosts} 
                    updateUsername={updateUsername}
                    removeDeletedUserPosts={removeDeletedUserPosts}
                  />
                ):(<Alert />)}
  
          </Route> */}

          <Route  path='/login'>
            <Login updateUser={updateUser}/>          
          </Route>

          <Route path='/signup'>
            <Signup updateUser={updateUser}/>          
          </Route>

{/* 
          <Route path='/display-bird/:id'>
            <DisplayBird birds={birds}/>
          </Route> */}
          

        </Switch>
      </div>


    </div>
        </UserContext.Provider>

  );
}

export default App;
