import { Input, Button } from 'reactstrap'
import React, { useState } from 'react'
import { UserContext } from './App'
import { useContext } from 'react'

function ProfileEditForm({clickEdit}){

    const [ user, setUser ] = useContext(UserContext)

    const [ inputText, setInputText ] = useState(user.username)
    const [ errors, setErrors ] = useState([])

    const renderErrors = errors.map( e => {
        return <p key={e} className='error'>{e}</p>
    })

    function submitNameChange(e){
        e.preventDefault()
        fetch(`/users/:id`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: inputText
            })
        })
        .then(res => {
            if(res.ok){
                res.json()  
                .then(data => {
                    setUser({...user, username: data.username})
                    clickEdit()
                })
            }else{
                res.json().then(data => setErrors(data.errors)
               )
            }
        })
    }

    return (
        <form onSubmit={submitNameChange}>
            <Input value={inputText} onChange={e=> setInputText(e.target.value)}/>
            <Button color='success'>Submit</Button>
            <Button onClick={clickEdit}color='warning'>Cancel</Button>
            { errors.length > 0 ? renderErrors : null }
        </form>
    )
}

export default ProfileEditForm