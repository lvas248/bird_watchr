import { useParams, useHistory } from "react-router-dom"
import { Card, CardBody, CardTitle, CardText, Button, CardImg } from 'reactstrap'

function DisplayBird({birds}){

    const params = useParams()
    const history = useHistory()

    const bird = birds.find( b => b.id === parseInt(params.id)
    )

    console.log(bird)

    return (
        <>
            <Card id="displayDiv">
                <img src={bird.image_url}/>
                <CardBody>
                    <CardTitle tag='h2'>{bird.name}</CardTitle>
                    <CardText>{bird.description}</CardText>
                </CardBody>
            </Card>       
            <Button onClick={()=>history.goBack()} color='primary'>Back To Feed</Button>
        </>



    )

}

export default DisplayBird