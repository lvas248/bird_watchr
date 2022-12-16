import React, { useState } from 'react'

import { CardBody, Label, Input, Button } from 'reactstrap'

function EditForm({post, birds, clickEdit, updateBird}){

    const [ postObj, setPostObj ] = useState({
        bird_id: post.bird.id,
        caption: post.caption,
        id: post.id
    })

    const renderOptions = birds.map( bird =>{
        return <option key={bird.id} value={bird.id}>{bird.name}</option>
    })

    function updatePost(key, e){
        const copy = {...postObj}
        copy[key] = e.target.value
        setPostObj(copy)
        console.log(copy)
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
        .then( data => updateBird(data))
        clickEdit()
    }

    return (
        <form onSubmit={submitEdit}>
            <CardBody>
                <Label><strong>Bird: </strong></Label>
                <div>    
                    <select onChange={e=>updatePost('bird_id',e)}>{renderOptions}</select>
                </div>
                    <Label><strong>Caption: </strong></Label>
                <div>    
                    <Input value={postObj.caption} onChange={e=> updatePost('caption',e)}/>
                </div>
            </CardBody>
            <CardBody>
                <Button color='success' type='submit'>Update Post</Button> 
                <Button color='danger' type='button'>Delete Post</Button> 
                <Button type='button'onClick={()=>clickEdit()}>Cancel</Button>
            </CardBody>
        </form>

    )
}

export default EditForm