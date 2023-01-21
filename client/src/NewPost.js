import React, { useState } from 'react'
import { Form, Label, Input, Button, FormGroup, Card, Row, Col} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { UserContext } from './App'
import { useContext } from 'react'

function NewPost({birds, createUniqueUserBirdsFromCurrentPosts,updateBirdsList}){

    const [ user, setUser ] = useContext(UserContext)
    const history = useHistory()

    const [ postObj, setPostObj ] = useState({
        location:'',
        caption: '',
        image_url: '',
        bird_id: 0, 
        bird_attributes: {
            name: '',
            description: ''            
        }
    })
    

    const [ errors, setErrors ] = useState([])

    const [ select, setSelect ] = useState(true)

    function updatePostObj(key, e){
        const copy = {...postObj}
        copy[key] = e.target.value
        setPostObj(copy)
    }

    function resetPostObj(){
        setPostObj({
            location:'',
            caption: '',
            image_url: '',
            bird_id: 0, 
            bird_attributes: {
                name: '',
                description: ''            
            }
        })
        
    }

    function changeSelect(value){
        setSelect(value)
        resetPostObj()
    }

    function updateNestedBirdAttribbutes(key, value){
        const  copy = {...postObj.bird_attributes}
        copy[key] = value
        setPostObj({...postObj, bird_attributes: copy})
    }

    function submitNewPost(e){
        e.preventDefault()
        fetch('/posts',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({post: postObj})
        })
        .then(res => {
            if(res.ok){
                res.json().then(data => {
                    
                    //create copy of user and add new post
                    let userCopy = {...user, posts: [data, ...user.posts]}
                    //if user.birds doesn't already contain the new post's bird, add bird to user.
                    userCopy = createUniqueUserBirdsFromCurrentPosts(userCopy)
                    //If user created new bird, add to birds list
                    updateBirdsList(data.bird_info)
                    //update global user
                    setUser(userCopy)
                    
                    history.push('/')
                }
                )
            }else{
                res.json().then(errorData => setErrors(errorData.errors))
            }
        }
        )

        resetPostObj()
    }


 
    const renderErrors = errors?.map( error => {
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
                                        <Input type='radio' name='bird' checked={select} onChange={()=>changeSelect(true)}/>
                                        <Label >Select</Label>
                                    </div>

                                    <div>
                                        <Input type="radio" name='bird' onChange={()=>changeSelect(false)}/>
                                        <Label >Create New</Label>
                                    </div>

                                </div>

                                { select ? (
                                    <FormGroup>
                                        <Input 
                                            type='select' 
                                            value={postObj.bird_id} 
                                            onChange={e=>updatePostObj('bird_id', e)}>
                                            {[<option key='0' value='0'>Select Bird</option>, ...renderOptions]}
                                        </Input>
                                    </FormGroup> 
                                ):(
                                    <FormGroup>
                                        <Row className="row-cols-lg-auto g-3 align-items-center">
                                            <Col sm={4}>
                                                <Label>Name</Label>
                                                <Input value={postObj.bird_attributes.name} onChange={e=> updateNestedBirdAttribbutes('name', e.target.value)}/>
                                            </Col>

                                            <Col >
                                                <Label>Description</Label>
                                                <Input value={postObj.bird_attributes.description} onChange={e=>updateNestedBirdAttribbutes('description', e.target.value)}/>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                )}


                        </FormGroup>

                        <FormGroup className='formGroup'>
                            <Label className='label'>Location: </Label>
                            <Input value={postObj.location} onChange={e=>updatePostObj('location', e)}/>
                        </FormGroup>   

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