import { Button, Card, CardBody } from 'reactstrap'
import { useHistory } from 'react-router-dom'
function Alert(){
    const history = useHistory()

    function loginSignup(route){
        history.push(route)
    }

    return (
        <Card>
            <CardBody>
                <h4><Button onClick={()=>loginSignup('/login')}>Login</Button> or <Button onClick={()=>loginSignup('/signup')}>Sign up</Button> to access full features...</h4>
            </CardBody>
        </Card>
    )
}
export default Alert