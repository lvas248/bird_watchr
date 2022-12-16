import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'

function Post({post, user}){

    return (
        <div id='card'>
            <Card 
                body>
                {/* // // style={{width: '10rems'}}> */}
                <CardImg alt='bird' src={post.image_url}></CardImg>
                <CardBody>
                    <CardTitle tag='h5'>🦅 {post.bird.name}</CardTitle>
                    <CardSubtitle tag='h6'>👤 {post.user.username}</CardSubtitle>
                    <CardText>{post.caption}</CardText>
                </CardBody>
                <CardBody>
                    <Button color='primary'>Like</Button>
                    <Button color='secondary'>Comment</Button>
                </CardBody>
            </Card>            
        </div>

    )
}

export default Post