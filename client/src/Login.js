import React, { useState, useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Form, Button, Input, Label, Card, CardBody } from 'reactstrap'
import { UserContext } from './App'

function Login(){

    const [ ,setUser ] = useContext(UserContext)

    const obj = { username: '', password: ''}

    const [ loginObj, setLoginObj ] = useState(obj)
    const [ error, setError ] = useState()

    const history = useHistory()

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
                res.json().then(data => {
                    setUser(data)        
                    history.push('/my-posts')
                })
            }else{
                res.json().then(errorData => setError(errorData.error))
            }
        })

    }

    return (
        <Card id='form'>
            <CardBody>
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

                {error ? <p className='error'>{error}</p> : null}

                <div id='toSignup'>
                    <p>New to BirdWatchr? <NavLink to='/signup'>Signup</NavLink></p>
                </div>                
            </CardBody>


        </Card>
    )
}
export default Login