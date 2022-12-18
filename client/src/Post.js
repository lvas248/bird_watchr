
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'
import React, { useState } from 'react'
import EditForm from './EditForm'

function Post({post, user, birds, updatePost, deletePost}){

    const [ editClick, setEditClick ] = useState(false)

    const isUserPost = (post.user.id === user.id)

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
                            <Button className='lkeButton' color='secondary'>🤍</Button> 
                            <Button className='CommentButtons' color='primary'>⋯</Button> 
                            {isUserPost ? <Button color='success' onClick={clickEdit}>✏️</Button> : null }
                        </CardBody>
                    </>

                )}
            
            </Card>            
        </div>
    )
}

export default Post