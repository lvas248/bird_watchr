
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'
import React  from 'react'
import { UserContext } from './App'
import { useContext } from 'react'

function Post({post}){

    const [ user,setUser ] = useContext(UserContext)

    function deletePost(){

        fetch(`/posts/${post.id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            setUser({...user, posts: user.posts.filter( p => p.id !== data.id)})
        })
    }


    return (
        <div id='cardContainer'>

            <Card className='card'  body>

                <CardSubtitle tag='p'>Date </CardSubtitle>
                
                { post.image_url ? <CardImg alt='bird' src={post.image_url}></CardImg> : null }
                 
                <CardBody>
                    <CardTitle className='birdName' tag='h5'>{post.bird_name}</CardTitle>
                    <CardSubtitle tag='p'> {post.location}</CardSubtitle>
                    <CardText>Notes: {post.caption}</CardText>
                </CardBody>
                        
                <CardBody>
                    <Button>Edit</Button>
                    <Button onClick={deletePost}>Delete</Button>
                </CardBody>

            
            </Card>  
                  
           
        </div>
    )
}

export default Post