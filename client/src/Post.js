
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'
import React, { useState }  from 'react'
import EditForm from './EditForm'
import { UserContext } from './App'
import { useContext } from 'react'

function Post({post, birds, clearSideBarSelection}){

    const [ user,setUser ] = useContext(UserContext)

    const [ editClick, setEditClick ] = useState(false)


    function clickEditBtn(){
        setEditClick(!editClick)
    }

    function deletePost(){
        fetch(`/posts/${post.id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            // //Create copy of user and remove the deleted post from it
            // let userCopy = {...user, posts: user.posts.filter( p => p.id !== data.id)}
            // //update userCopy.birds list
            // userCopy = createUniqueUserBirdsFromCurrentPosts(userCopy)
            // //update global user
            setUser(data)
            clearSideBarSelection()
        })
    }


    return (
        <div id='cardContainer'>

            <Card className='card'  body>
                <CardSubtitle className='date' tag='p'>{post.date}</CardSubtitle>
                
                { post.image_url ? <CardImg alt='bird' src={post.image_url}></CardImg> : null }
                 
                <CardBody>
                    { editClick ? (
                            <EditForm post={post} clickEditBtn={clickEditBtn} birds={birds} user={user} setUser={setUser} />
                        ):(
                        <>
                            <CardTitle className='birdName' tag='h5'>{post.bird_info.name}</CardTitle>
                            
                            <CardSubtitle className='date' tag='p'> {post.location}</CardSubtitle>
                            
                            <Card id='textBox'>
                                <CardText>Notes: {post.caption}</CardText>
                            </Card>
                            
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