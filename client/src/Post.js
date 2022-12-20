
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'
import React, { useState } from 'react'
import EditForm from './EditForm'
import CommentSection from './CommentSection'

function Post({post, user, birds, updatePost, deletePost, addLikeToPosts, removeLikeFromPosts, addCommentToPost, deleteCommentFromPosts}){

    
    const [ editClick, setEditClick ] = useState(false)
    const [ commentClick, setCommentClick ] = useState(false)

    const isUserPost = (post.user.id === user.id || user.isAdmin === true)
    console.log(user)

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

    function clickComment(){
        setCommentClick(!commentClick)
    }


    return (
        <div id='cardContainer'>

            <Card className='card'  body>
                <CardImg alt='bird' src={post.image_url}></CardImg>

                {editClick ? <EditForm post={post} birds={birds} clickEdit={clickEdit} updatePost={updatePost} deletePost={deletePost}/> :(
                    <>                    
                        <CardBody>
                            <CardTitle tag='h5'>🦅 {post.bird.name}</CardTitle>
                            <CardSubtitle tag='h6'>👤 {post.user.username}</CardSubtitle>
                            <CardText>{post.caption}</CardText>
                        </CardBody>
                        
                        { user.username ? (
                        <CardBody className='btnContainer'>

                            { likeObj ? <Button onClick={unlikePost}outline color='primary'>❤️ {post.likes.length}</Button> : <Button onClick={likePost}outline color='secondary'>🤍 {post.likes.length}</Button>}
                           
                            <Button className='CommentButtons' onClick={clickComment} color='primary'>⋯</Button> 
                            
                            {isUserPost ? <Button color='success' outline onClick={clickEdit}>✏️</Button> : null }

                        </CardBody> 
                        ):( <p className='error'>Login to interact</p> )}
                    </>
                )}

                { commentClick ? (<CommentSection 
                                    post={post} 
                                    user={user} 
                                    addCommentToPost={addCommentToPost}
                                    deleteCommentFromPosts={deleteCommentFromPosts}/>
                                ): null }

            </Card>  
                  
           
        </div>
    )
}

export default Post