
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'
import React  from 'react'
import { UserContext } from './App'
import { useContext } from 'react'

function Post({post, }){

    const [ user,setUser ] = useContext(UserContext)

    function deletePost(){

        fetch(`/posts/${post.id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            //Create copy of user and remove the deleted post from it
            let userCopy = {...user, posts: user.posts.filter( p => p.id !== data.id)}
            //delete bird from user.birds (if) user.posts does not contain posts with deletedpost's bird
            const filteredPosts = userCopy.posts.filter( p => p.bird_name === data.bird_name)
            if( filteredPosts.length < 1){
                userCopy = {...userCopy, birds: [...userCopy.birds.filter( b=> b.name !== data.bird_name)]}
            }
            //update global user
            setUser(userCopy)
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