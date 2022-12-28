import { useParams, useHistory } from "react-router-dom"
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap'

function DisplayBird({birds}){

    const params = useParams()
    const history = useHistory()

    const bird = birds.find( b => b.id === parseInt(params.id)
    )


    return (
        <>
            <Card id="displayDiv">
                <img alt={bird.name} src={bird.image_url}/>
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