import React, { useState } from 'react'
import { Form, Label, Input, Button, FormText, FormGroup, Card } from 'reactstrap'
import { useHistory } from 'react-router-dom'

function NewPost({birds, user, addPost}){

    const history = useHistory()

    const [ postObj, setPostObj ] = useState({
        caption: '',
        image_url: '',
        bird_id: ''
    })
    const [ errors, setErrors ] = useState([])

    function updatePostObj(key, e){
        const copy = {...postObj}
        copy[key] = e.target.value
        setPostObj(copy)
    }

    function submitNewPost(e){
        e.preventDefault()
        fetch('/posts',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({...postObj, user_id: user.id})
        })
        .then(res => {
            if(res.ok){
                res.json().then(data => {
                    addPost(data)
                    history.push('/')
                })
            }else{
                res.json().then(errorData => setErrors(errorData.errors))
            }
        })

        setErrors([])
        setPostObj({caption: '',image_url: '',bird_id: ''})   
    }

 
    const renderErrors = errors.map( error => {
        return <p key={error} className='error'>{error}</p>
    })

    const renderOptions = birds.map( bird =>{
        return <option key={bird.name} value={bird.id}>{bird.name}</option>
    })

    return (
        <div id='postForm'>        
            <Card id='newPost'>
                    <h3>New Post</h3>
                    <Form onSubmit={submitNewPost}>

                       <FormGroup className='formGroup'>
                            <Label className='label'>Bird: </Label>
                            <Input 
                                type='select' 
                                value={postObj.bird_id} 
                                onChange={e=>updatePostObj('bird_id', e)}>
                                {[<option key='0'>Select Bird</option>, ...renderOptions]}
                            </Input>
                        </FormGroup>   
     

                        <FormText>Click <Button onClick={()=>history.push('/add-bird')} type='button' color='primary' id='birdFormButton' size='sm' outline >here</Button> to add new bird to the list</FormText>

                        <FormGroup className='formGroup'>
                            <Label className='label'>Image  URL:</Label>
                            <Input 
                                value={postObj.image_url} 
                                onChange={e=>updatePostObj('image_url', e)}
                            />
                        </FormGroup>

                        <FormGroup className='formGroup'>
                            <Label className='label'>Caption: </Label>
                            <Input type='textarea' value={postObj.caption} onChange={e=>updatePostObj('caption',e)}/>
                        </FormGroup>
                
                        <Button>Submit</Button>
                        
                    </Form>                
   
                {errors ? renderErrors : null}
            </Card>
        </div>


    )
}

export default NewPost