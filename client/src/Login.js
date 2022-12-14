import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Form, Button, Input, Label } from 'reactstrap'

function Login(){

    const obj = { username: '', password: ''}

    const [ loginObj, setLoginObj ] = useState(obj)

    function updateLoginObj(key, value){
        const copy = {...loginObj}
        copy[key] = value
        setLoginObj(copy)
    }

    function submitLogin(e){
        e.preventDefault()
        fetch('/login',{
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(loginObj)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        setLoginObj(obj)
    }

    return (
        <div id='form'>
            <h1>Login</h1>
            <Form onSubmit={submitLogin}>
                <Label>Username</Label>
                <Input value={loginObj.username} onChange={e=> updateLoginObj('username', e.target.value)}/>

                <Label>Password</Label>
                <Input value={loginObj.password} onChange={e=> updateLoginObj('password', e.target.value)}/>

               <Button color='primary'>Login</Button>
            </Form>

            <div id='toSignup'>
                <p>New to BirdWatchr? <NavLink to='/signup'>Signup</NavLink></p>
                
            </div>

        </div>
    )
}
export default Login