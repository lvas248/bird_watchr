import { Card, CardBody } from 'reactstrap'
import { Switch, Route, NavLink } from 'react-router-dom'

import Profile from './Profile'
import Feed from './Feed'

function MyStuff({user, posts, birds, updatePost, deletePost, addLikeToPosts, removeLikeFromPosts, addCommentToPost, deleteCommentFromPosts, updateUsername, removeDeletedUserPosts}){

    const userPosts = posts.filter( post => post.user.id === user.id)

    
    const renderMyBirds = user.birds.map( b =>{
        return <p key={b.id}>{b.name}</p>
    })
    
    return (
        <Card id='myStuffContainer'>
            <CardBody className='leftPanel'>
                    <NavLink className='navItem' to='/my-stuff/posts'>My Posts</NavLink>
                    <NavLink className='navItem' to='/my-stuff/profile'>Profile Settings</NavLink>
            </CardBody>
            <div id='rightPanel'>
                <Switch>
 
                    <Route exact path='/my-stuff/posts'>
                        <div id='myBirdDiv'>
                            <h4>My Birds: </h4>
                            {renderMyBirds}
                        </div>
                        <Feed className='switchContainer'
                            posts={ userPosts} 
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

                    <Route path='/my-stuff/profile'>
                        <Profile user={user} removeDeletedUserPosts={removeDeletedUserPosts} updateUsername={updateUsername} />
                    </Route>

                </Switch>
            </div>
        </Card>
    )
}

export default MyStuff