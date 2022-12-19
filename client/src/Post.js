
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'
import React, { useState } from 'react'
import EditForm from './EditForm'

function Post({post, user, birds, updatePost, deletePost, addLikeToPosts, removeLikeFromPosts}){

    
    const [ editClick, setEditClick ] = useState(false)

    // const [ likeObj, setLikeObj ] = useState( 
    //     post.likes.find( like => {
    //         return like.user_id === user.id && like.post_id === post.id
    //     })
    // )

        //I don't think we need the likeObj state.  Make the rendering of the like butttons conditional on the existance of the  user's like obj in the likes array.
        //When user likes a post, send a post request, add response to the likes arrauy in the App component
        //When a user unlikes a post, send a delete request , delete response from the likes arrray in the App component


    //Checks to see if current post belongs to the user, if so, it will allow the user to edit tthe post
    const isUserPost = (post.user.id === user.id)

    const likeObj = post.likes.find( like => {
        return like.user_id === user.id && like.post_id === post.id
    })

    function likePost(){
        fetch('/likes', {
            method: 'POST', 
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                user_id: user.id,
                post_id: post.id
            })
        })
        .then(res => res.json())
        .then(data => addLikeToPosts(post.id, data))

    }

    function unlikePost(){
        fetch(`/likes/${likeObj.id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => removeLikeFromPosts(post.id, data.id))
    }

    function clickEdit(){
        setEditClick(!editClick)
    }

    

    return (
        <div id='card'>
            <Card className='card' body>
                <CardImg alt='bird' src={post.image_url}></CardImg>

                {editClick ? <EditForm post={post} birds={birds} clickEdit={clickEdit} updatePost={updatePost} deletePost={deletePost}/> :(
                    <>                    
                        <CardBody>
                            <CardTitle tag='h5'>🦅 {post.bird.name}</CardTitle>
                            <CardSubtitle tag='h6'>👤 {post.user.username}</CardSubtitle>
                            <CardText>{post.caption}</CardText>
                        </CardBody>
                        <CardBody className='btnContainer'>
                            { likeObj ? <Button onClick={unlikePost}outline color='primary'>❤️ {post.likes.length}</Button> : <Button onClick={likePost}outline color='secondary'>🤍 {post.likes.length}</Button> 
  }
                            <Button className='CommentButtons' color='primary'>⋯</Button> 
                            {isUserPost ? <Button color='success' outline onClick={clickEdit}>✏️</Button> : null }
                        </CardBody>
                    </>

                )}
            
            </Card>            
        </div>
    )
}

export default Post