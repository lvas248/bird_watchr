
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'
import React  from 'react'

function Post({post}){


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
                    <Button>Delete</Button>
                </CardBody>

            
            </Card>  
                  
           
        </div>
    )
}

export default Post