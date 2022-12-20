import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Form, Button, Input, Label } from 'reactstrap'


function Signup({updateUser}){

    const defaultObj = { username: '', password: '', password_confirmation: ''}

    const [ signupObj, setSignupObj ] = useState(defaultObj)

    const history = useHistory()

    function updateSignupObj(key, value){
        const copy = {...signupObj}
        copy[key] = value
        setSignupObj(copy)
    }

    function submitSignup(e){
        e.preventDefault()
        fetch('/signup',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(signupObj)
        })
        .then(res => res.json())
        .then(data => updateUser(data))
        setSignupObj(defaultObj)
        history.push('/feed')
    }

    return (
        <div id='form'>

            <h1>Signup</h1>
            <Form onSubmit={submitSignup}>
                <Label>Username</Label>
                <Input value={signupObj.username} onChange={e=> updateSignupObj('username', e.target.value)}/>

                <Label>Password</Label>
                <Input value={signupObj.password} type='password' onChange={e=> updateSignupObj('password', e.target.value)}/>

                <Label>Password</Label>
                <Input value={signupObj.password_confirmation} type='password' onChange={e=> updateSignupObj('password_confirmation', e.target.value)}/>

            <Button color='primary'>Submit</Button>

            </Form>
            <NavLink to='/login'>Back to Login</NavLink>


        </div>
    
    )
}

export default Signup