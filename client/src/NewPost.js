import React, { useState } from 'react'
import { Form, Label, Input, Button, FormText, FormGroup, Card, Row, Col} from 'reactstrap'
import { useHistory } from 'react-router-dom'

function NewPost({birds, user, addPost}){

    const history = useHistory()

    const [ postObj, setPostObj ] = useState({
        location:'',
        caption: '',
        image_url: '',
        bird_id: ''
    })
    const [ errors, setErrors ] = useState([])

    const [ radio, setRadio ] = useState(true)

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
        setPostObj({location: '', caption: '', image_url: '', bird_id: ''})   
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



                        <FormGroup className='formGroup' id='bird'>
           
                                <div id='select'>
                                
                                    <Label>Bird: </Label>
                                
                                    <div>
                                        <Input type='radio' name='bird' checked={radio} onChange={()=>setRadio(true)}/>
                                        <Label >Select</Label>
                                    </div>

                                    <div>
                                        <Input type="radio" name='bird' onChange={()=>setRadio(false)}/>
                                        <Label >Create New</Label>
                                    </div>

                                </div>

                                { radio ? (
                                    <FormGroup>
                                        <Input 
                                            type='select' 
                                            value={postObj.bird_id} 
                                            onChange={e=>updatePostObj('bird_id', e)}>
                                            {[<option key='0'>Select Bird</option>, ...renderOptions]}
                                        </Input>
                                    </FormGroup> 
                                ):(
                                    <FormGroup>
                                        <Row className="row-cols-lg-auto g-3 align-items-center">
                                            <Col sm={4}>
                                                <Label>Name</Label>
                                                <Input />
                                            </Col>

                                            <Col >
                                                <Label>Description</Label>
                                                <Input />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                )}


                        </FormGroup>

                       <FormGroup className='formGroup'>
                            <Label className='label'>Location: </Label>
                            <Input value={postObj.location} onChange={e=>updatePostObj('location', e)}/>
                        </FormGroup>   



                        {/* <FormText>Click <Button onClick={()=>history.push('/add-bird')} type='button' color='primary' id='birdFormButton' size='sm' outline >here</Button> to add new bird to the list</FormText> */}

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