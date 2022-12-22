import { Input, Button } from 'reactstrap'
import React, { useState } from 'react'

function ProfileEditForm({clickEdit, user, updateUsername}){

    const [ inputText, setInputText ] = useState(user.username)

    function submitNameChange(e){
        e.preventDefault()
        fetch(`/users/${user.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: inputText
            })
        })
        .then(res => res.json())
        .then(data => {
            updateUsername(data)
            clickEdit()
        })
    }
    return (
        <form onSubmit={submitNameChange}>
            <Input value={inputText} onChange={e=> setInputText(e.target.value)}/>
            <Button color='success'>Submit</Button>
            <Button onClick={clickEdit}color='warning'>Cancel</Button>
        </form>
    )
}

export default ProfileEditForm