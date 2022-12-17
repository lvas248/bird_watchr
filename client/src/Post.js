import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'
import React, { useState } from 'react'
import EditForm from './EditForm'

function Post({post, user, birds, updatePost}){

    const [ editClick, setEditClick ] = useState(false)

    const isUserPost = post.user.id === user.id

    function clickEdit(){
        setEditClick(!editClick)
    }



    return (
        <div id='card'>
            <Card body>
                <CardImg alt='bird' src={post.image_url}></CardImg>

                {editClick ? <EditForm post={post} birds={birds} clickEdit={clickEdit} updatePost={updatePost}/> :(
                    <>                    
                        <CardBody>
                            <CardTitle tag='h5'>🦅 {post.bird.name}</CardTitle>
                            <CardSubtitle tag='h6'>👤 {post.user.username}</CardSubtitle>
                            <CardText>{post.caption}</CardText>
                        </CardBody>
                        
                        <CardBody>
                            <Button color='primary'>Like</Button> 
                            <Button color='secondary'>Comment</Button> 
                            {isUserPost ? <Button onClick={clickEdit}>Edit</Button> : null }
                        </CardBody>
                    </>

                )}
            
            </Card>            
        </div>
    )
}

export default Post