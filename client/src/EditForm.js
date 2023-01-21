import React, { useState } from 'react'
import { Label, Input, Button, Form, FormGroup } from 'reactstrap'

function EditForm({post, birds, clickEditBtn, user, setUser, createUniqueUserBirdsFromCurrentPosts}){


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
                res.json().then(editedPost => {
                    //create copy of global user obj, replace old post with updated post
                    let userCopy = {...user, posts: user.posts.map( p => {
                        if(p.id === editedPost.id) return editedPost
                        else return p
                    })}
                    userCopy = createUniqueUserBirdsFromCurrentPosts(userCopy)
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