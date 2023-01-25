import React, { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from './App'
import { Label, Input, Button, Form, FormGroup } from 'reactstrap'

function EditForm({post, birds, clickEditBtn}){


    const [ user, setUser ] = useContext(UserContext)
    const [ editObj, setEditObj ] = useState({
            bird_id: post.bird_info.id,
            location: post.location,
            caption: post.caption
    })

    const [ errors, setErrors ] = useState([])


    function updateEditObject(key, value){
        const copy = {...editObj}
        copy[key] = value
        setEditObj(copy)
    }

    function submitEditForm(e){
        e.preventDefault()
        fetch(`/posts/${post.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(editObj)
        })
        .then(res => {
            if(res.ok){
                res.json().then(data => {
                    //Find the original post that has been edited
                    const oldPost = user.formatted_posts.find( p => p.id === data.id)
                
                    // create copy of user, replace original post with newly edited post
                    let userCopy = {...user, formatted_posts: user.formatted_posts.map( p => {
                        if(p.id === data.id) return data
                        else return p
                    })}


                    // If user.posts does not have a post that contains oldPost.bird, remove bird from user.birds
                    if(!userCopy.formatted_posts.some( p => p.bird_info.id === oldPost.bird_info.id) ){
                        userCopy = {...userCopy, birds: userCopy.birds.filter( b => b.id !== oldPost.bird_info.id)}
                    }

                    //if user.birds does not have the newPost.bird, add bird to user.birds
                    if(!userCopy.birds.some( b => b.id === data.bird_info.id)){
                        const updatedBirds = [...userCopy.birds, data.bird_info].sort( (a,b)=>{
                            if(a.name < b.name) return -1
                            else if(a.name > b.name) return 1
                            else return 0
                        })
                        userCopy = {...userCopy, birds: updatedBirds}
                    }

                    setUser(userCopy)
                    
                    clickEditBtn()
                })
            }else{
                res.json().then(errorData => setErrors(errorData.errors))
            }
        })
    }


    const renderBirdOptions = birds.map( b =>{
        return <option key={b.id} value={b.id}>{b.name}</option>
    })

    const renderErrors = errors?.map( e => {
        return <p className='error' key={e}>{e}</p>
    })


    
    return (   
                <Form onSubmit={submitEditForm}>
                    <FormGroup>

                        <Label>Bird: </Label>
                        <Input 
                            type='select'
                            value={editObj.bird_id}
                            onChange={e=>updateEditObject('bird_id', parseInt(e.target.value))}
                            >{renderBirdOptions}
                        </Input>

                    </FormGroup>  
                    <FormGroup>

                        <Label>Location: </Label>
                        <Input 
                            value={editObj.location}
                            onChange={e=>updateEditObject('location', e.target.value)}
                        />

                    </FormGroup>      
                    <FormGroup>

                        <Label>Notes: </Label>
                        <Input 
                            value={editObj.caption}
                            onChange={e=>updateEditObject('caption', e.target.value)}
                        />

                    </FormGroup>       
                    <FormGroup>

                        <Button>Submit</Button>
                        <Button 
                            type='button'
                            onClick={clickEditBtn}>
                            Cancel
                        </Button>

                        { renderErrors }

                    </FormGroup>
                </Form>
    )
}

export default EditForm