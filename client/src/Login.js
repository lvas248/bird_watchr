import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Form, Button, Input, Label } from 'reactstrap'

function Login({updateUser}){

    const history = useHistory()
    const obj = { username: '', password: ''}

    const [ loginObj, setLoginObj ] = useState(obj)
    const [ errors, setErrors ] = useState()


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
        .then(res => {
            if(res.ok){
                res.json().then(data => updateUser(data))
            }else{
                res.json().then(errorData => setErrors(errorData.error))
            }
        })
        history.push('/feed')
    }

    return (
        <div id='form'>
            <h1>Login</h1>
            <Form onSubmit={submitLogin}>

                <Label>Username</Label>

                <Input 
                    value={loginObj.username} 
                    onChange={e=> updateLoginObj('username', e.target.value)}
                />

                <Label>Password</Label>

                <Input 
                    value={loginObj.password} 
                    type='password' 
                    onChange={e=> updateLoginObj('password', e.target.value)}
                />

               <Button color='primary'>Login</Button>
               
            </Form>

            {errors ? <p className='error'>{errors}</p> : null}

            <div id='toSignup'>
                <p>New to BirdWatchr? <NavLink to='/signup'>Signup</NavLink></p>
            </div>

        </div>
    )
}
export default Login