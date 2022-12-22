import { Card, CardBody, Button} from 'reactstrap'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import ProfileEditForm from './ProfileEditForm'

function Profile({user, updateUsername, removeDeletedUserPosts}){

    const history = useHistory()

    const [ editClick, setEditClick ] = useState(false)

    function clickEdit(){
        setEditClick(!editClick)
    }
    function deleteAccount(){
        fetch(`/users/${user.id}`,{
            method: 'DELETE'
        })
        removeDeletedUserPosts(user)
        history.push('/login')
    }


    return(
        
        <Card>
            <CardBody id='profilePanel'>

            { editClick ? (
                <ProfileEditForm updateUsername={updateUsername} clickEdit={clickEdit} user={user} />
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

export default Profile