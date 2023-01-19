
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Label, Input } from 'reactstrap'
import React, { useState }  from 'react'
import EditForm from './EditForm'
import { UserContext } from './App'
import { useContext } from 'react'

function Post({post, birds, user, createUniqueUserBirdsFromCurrentPosts}){

    const [ ,setUser ] = useContext(UserContext)

    const [ editClick, SetEditClick ] = useState(false)


    function clickEditBtn(){
        SetEditClick(!editClick)
    }

    function deletePost(){

        fetch(`/posts/${post.id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            //Create copy of user and remove the deleted post from it
            let userCopy = {...user, posts: user.posts.filter( p => p.id !== data.id)}
            //delete bird from user.birds (if) user.posts does not contain other posts with deletedpost's bird
            const filteredPosts = userCopy.posts.filter( p => p.bird_info.id === data.bird_info.id)
            if( filteredPosts.length < 1){
                userCopy = {...userCopy, birds: [...userCopy.birds.filter( b=> b.id !== data.bird_info.id)]}
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
                    { editClick ? (
                            <EditForm post={post} clickEditBtn={clickEditBtn} birds={birds} user={user} setUser={setUser} createUniqueUserBirdsFromCurrentPosts={createUniqueUserBirdsFromCurrentPosts}/>
                        ):(
                        <>
                            <CardTitle className='birdName' tag='h5'>{post.bird_info.name}</CardTitle>
                            <CardSubtitle tag='p'> {post.location}</CardSubtitle>
                            <CardText>Notes: {post.caption}</CardText>
                            <Button onClick={clickEditBtn}>Edit</Button>
                            <Button onClick={deletePost}>Delete</Button>
                        </>
                    )}


                </CardBody>
                        


            
            </Card>  
                  
           
        </div>
    )
}

export default Post