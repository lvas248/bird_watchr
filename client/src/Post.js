
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'
import React, { useState } from 'react'
import EditForm from './EditForm'
import CommentSection from './CommentSection'
import { useHistory } from 'react-router-dom'
function Post({post, user, birds, updatePost, deletePost, addLikeToPosts, removeLikeFromPosts, addCommentToPost, deleteCommentFromPosts}){

    const history = useHistory()
    
    const [ editClick, setEditClick ] = useState(false)
    const [ commentClick, setCommentClick ] = useState(false)
    const [ error, setError] = useState('')

    const isUserPost = (post.user.id === user.id || user.isAdmin === true)

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
        .then(res => {
            if(res.ok){
                res.json().then(data => addLikeToPosts(data))
            }else{
                res.json().then(errorData => setError(errorData.error))
            }
        })
            
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

    function displayBird(){
        history.push(`/display-bird/${post.bird.id}`)
    }

    return (
        <div id='cardContainer'>

            <Card className='card'  body>
                <CardImg alt='bird' src={post.image_url}></CardImg>

                {editClick ? <EditForm post={post} birds={birds} clickEdit={clickEdit} updatePost={updatePost} deletePost={deletePost}/> :(
                    <>                    
                        <CardBody>
                            <CardTitle className='birdName' onClick={displayBird} tag='h5'>🦅 {post.bird.name}</CardTitle>
                            <CardSubtitle tag='h6'>👤 {post.user.username}</CardSubtitle>
                            <CardText>{post.caption}</CardText>
                        </CardBody>
                        
                        <CardBody className='btnContainer'>

                            { likeObj ? <Button onClick={unlikePost}outline color='primary'>❤️ {post.likes.length}</Button> : <Button onClick={likePost} outline color='secondary'>🤍 {post.likes.length}</Button>}
                           
                            <Button className='CommentButtons' onClick={user.username ? clickComment : null} color='primary'>⋯</Button> 
                            
                            {isUserPost ? <Button color='success' outline onClick={clickEdit}>✏️</Button> : null }
                    
                        </CardBody> 

                        { error ? <div><p className='error'>{error}</p></div> : null}

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