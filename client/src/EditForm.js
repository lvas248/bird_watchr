import React, { useState } from 'react'

import { CardBody, Label, Input, Button } from 'reactstrap'

function EditForm({post, birds, clickEdit, updatePost, deletePost}){

    const [ postObj, setPostObj ] = useState({
        bird_id: post.bird.id,
        caption: post.caption,
        id: post.id
    })

    const renderOptions = birds.map( bird =>{
        return <option key={bird.id} value={bird.id}>{bird.name}</option>
    })

    function updatePostObj(key, e){
        const copy = {...postObj}
        copy[key] = e.target.value
        setPostObj(copy)
    }

    function submitEdit(e){
        e.preventDefault()
        fetch('/posts', {
            method: 'PATCH',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(postObj)
        })
        .then(res => res.json())
        .then( data => updatePost(data))
        clickEdit()
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
                    <select onChange={e=>updatePostObj('bird_id',e)}>{renderOptions}</select>
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
        </form>

    )
}

export default EditForm