import { Card, CardBody, Button } from 'reactstrap'
import { useState } from 'react'
import ProfileEditForm from './ProfileEditForm'
import { useHistory } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from './App'

function MyStuff(){

    const [ user, setUser ] = useContext(UserContext)
    
    const history = useHistory()
    
    const [ editClick, setEditClick ] = useState(false)

    function clickEdit(){
        setEditClick(!editClick)
    }

    function deleteAccount(){
        fetch('/users/:id',{
            method: 'DELETE'
        })
        .then( res => {
            if(res.ok){
                res.json().then(data => {
                    setUser({})
                    history.push('/login')
                })}})
    }
    
    return (
        <Card>
            <CardBody id='profilePanel'>

                { editClick ? (
                    <ProfileEditForm clickEdit={clickEdit} user={user} setUser={setUser} />
                ):(   
                    <>
                        <div id='usernamePanel'>
                            <h2>{user.username}</h2>       
                            <Button color='primary' size='sm' onClick={clickEdit}>Edit Username</Button>       
                        </div>
                        <Button color='danger' onClick={deleteAccount}>Delete Account</Button>
                    </>)
                }

            </CardBody>
        </Card>
    )
}

export default MyStuff