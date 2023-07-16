import React, { useState } from 'react'
import { Form, Label, Input, Button, FormGroup, Card, Row, Col} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { UserContext } from './App'
import { useContext } from 'react'

function NewPost({birds, updateBirds}){

    const [ user, setUser ] = useContext(UserContext)
    const history = useHistory()

    const [ postObj, setPostObj ] = useState({
        location:'',
        caption: '',
        bird_id: 0, 
        bird_attributes: {
            name: '',
            description: ''            
        }
    })
    const [ imageFile, setImageFile ] = useState(null)
    
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

    function handleImageSelect(e){
        setImageFile(e.target.files[0])
    }


    function submitNewPost(e){
        e.preventDefault()
        const formData = new FormData()
        // Object.keys(postObj).forEach( k => {
        //     formData.append(k, postObj[k])
        // } )
        formData.append( 'post', JSON.stringify(postObj))
        formData.append( 'image', imageFile)
        fetch('/posts',{
            method: 'POST',
            body: formData
        })
        .then(res => {
            if(res.ok){
                res.json().then(data => {
                    
                    //add new post to user obj
                    let userCopy = {...user, formatted_posts: [data,...user.formatted_posts]}

                    // if new post contains a bird that doesn't already exist in user.birds, update user.birds
                    if(!user.birds.some( birdObj => birdObj.id === data.bird_info.id)){
                        const updatedUserBirds = [...user.birds, data.bird_info].sort((a,b) => {
                            if(a.name < b.name) return -1
                            else if(a.name > b.name) return 1
                            else return 0
                        } )
                        userCopy = {...userCopy, birds: updatedUserBirds}
                    }

                    setUser(userCopy)

    
                    // if bird isn't already included in the birds state, add new post.bird into birds state
                    if( !birds.some( b => b.id === data.bird_info.id) ){
                        const updatedBirds = [...birds, data.bird_info].sort( (a,b)=>{
                            if(a.name < b.name) return -1
                            else if( a.name > b.name) return 1
                            else return 0
                        })
                        updateBirds(updatedBirds)
                    }

                    history.push('/my-posts')
                })
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
        return <option key={bird.id} value={bird.id}>{bird.name}</option>
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
                            <Label className='label'>Image:</Label>
                            <Input 
                                id='imageInput'
                                name='image'
                                type='file'
                                // value={postObj.image}
                                onChange={handleImageSelect}
                            />
                        </FormGroup>

                        <FormGroup className='formGroup'>
                            <Label className='label'>Caption: </Label>
                            <Input type='textarea' value={postObj.caption} onChange={e=>updatePostObj('caption',e)}/>
                        </FormGroup>
                
                        <Button>Submit</Button>
                        
                    </Form>                
                { renderErrors }
            </Card>
        </div>


    )
}

export default NewPost