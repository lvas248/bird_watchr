import { Form, FormGroup, Input, Button } from 'reactstrap'
import React, { useState } from 'react' 

function CommentForm({user, post, addCommentToPost}){

    const [ commentText, setCommentText ] = useState('')

    function submitComment(e){
        e.preventDefault()
        fetch('/comments',{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                user_id: user.id,
                post_id: post.id, 
                content: commentText
            })
        })
        .then(res => res.json())
        .then(data => addCommentToPost(data))
        setCommentText('')
    }

 
    
    return (
        <Form onSubmit={submitComment}>
            <FormGroup id='commentForm'>                
                <Input 
                    placeholder='Comment...' 
                    value={commentText} 
                    onChange={e=>setCommentText(e.target.value)}>
                </Input>
                <Button>Submit</Button>
            </FormGroup>
        </Form>
    )
}
export default CommentForm