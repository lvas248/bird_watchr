import React, { useState } from 'react'

import { CardBody, Label, Input, Button } from 'reactstrap'

function EditForm({post, birds, clickEdit, updatePost, deletePost}){

    const [ errors, setErrors ] = useState([])

    const [ postObj, setPostObj ] = useState({
        bird_id: post.bird.id,
        caption: post.caption,
        id: post.id
    })

    const renderOptions = birds.map( bird =>{
        return <option key={bird.name} value={bird.id}>{bird.name}</option>
    })

    const renderErrors = errors.map( e => {
        return <p key={e} className='error'>{e}</p>
    })

    function updatePostObj(key, e){
        const copy = {...postObj}
        copy[key] = e.target.value
        setPostObj(copy)
    }

    function submitEdit(e){
        e.preventDefault()
        fetch(`/posts/${post.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(postObj)
        })
        .then(res => {
            if(res.ok){
                res.json().then( data => {
                    updatePost(data)
                    clickEdit()
                })
            }else{
                res.json().then( data => setErrors(data.errors))
            }
        
        })
    }

    function submitDelete(){
        fetch(`/posts/${post.id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => deletePost(data))
    }
    
    return (
        <form onSubmit={submitEdit}>
            <CardBody>
                <Label><strong>Bird: </strong></Label>
                <div>    
                    <select value={postObj.bird_id} onChange={e=>updatePostObj('bird_id',e)}>{renderOptions}</select>
                </div>
                    <Label><strong>Caption: </strong></Label>
                <div>    
                    <Input value={postObj.caption} onChange={e=> updatePostObj('caption',e)}/>
                </div>
            </CardBody>
            <CardBody className='btnContainer'>
                <Button color='success' type='submit'>✔</Button> 
                <Button color='danger' type='button' onClick={()=>submitDelete()}>X</Button> 
                <Button type='button' color='warning' onClick={()=>clickEdit()}>Cancel</Button>
            </CardBody>
            { errors.length > 0 ? renderErrors : null }
        </form>

    )
}

export default EditForm