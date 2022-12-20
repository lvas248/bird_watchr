import './App.css';
import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';
import Navbar from './Navbar';
import Feed from './Feed';
import NewPost from './NewPost';

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


  function updatePost(postObj){
    const updatedList = posts.map( post =>{
      if(postObj.id === post.id) return postObj
      else return post
    })
    setPosts(updatedList)
  }
  function deletePost(postObj){
    const updatedPosts = posts.filter( post =>
       post.id !== postObj.id)
    setPosts(updatedPosts)
  }
  function addPost(newPostObj){
    setPosts([newPostObj, ...posts])
  }
  
  
  function addLikeToPosts(post_id, newLikeObj){
    // console.log(newLikeObj)
    const post = posts.find(p => p.id === post_id)
    post.likes.push(newLikeObj)
    const updatedPost = posts.map( p => {
      if( p.id === post_id ) return post
      else return p
    })
    setPosts(updatedPost)
  }
  function removeLikeFromPosts(post_id, likeObj_id){
  //Find current post and make copy
  const post = posts.find(p => p.id === post_id)
  //Remove like obj from copy
  post.likes = post.likes.filter( l => {
    return l.id !== likeObj_id
  })
  //replace the post with copy
  const updatedPosts = posts.map( p => {
    if(p.id === post.id) return post
    else return p
  })
  setPosts(updatedPosts)

  }


  function addCommentToPost(commentObj){
    const post = posts.find( p => p.id === commentObj.post.id)
    post.comments = [commentObj, ...post.comments]
    const copy = posts.map( p => {
      if(p.id === post.id) return post
      else return p
    })
    setPosts(copy)
  }
  function deleteCommentFromPosts(commentObj){
    //Find deleted post in posts list
    const post = posts.find(p => p.id === commentObj.post.id)
    //remove comment from found post 
    post.comments = post.comments.filter( c => {
      console.log(c.id, commentObj.id)
        return c.id !== commentObj.id
    })
    //replace postObj in post list
    const copy = posts.map( p => {
      if(p.id === post.id) return post
      else return p
    })
    setPosts(copy) 
  }


  return (
    <div className="App">
      
      <Navbar user={user} removeUser={removeUser}/>

      <div id='switch_container'>

        <Switch>

          <Route path='/feed'>
            <Feed 
              posts={posts} 
              user={user} 
              birds={birds} 
              updatePost={updatePost} 
              deletePost={deletePost} 
              addLikeToPosts={addLikeToPosts} 
              removeLikeFromPosts={removeLikeFromPosts}
              addCommentToPost={addCommentToPost}      
              deleteCommentFromPosts={deleteCommentFromPosts} 
              />   
          </Route>

          <Route path='/new-post'>
            <NewPost birds={birds} user={user} addPost={addPost}/>
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
