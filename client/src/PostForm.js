import { Form, Label, Input, Button, FormText, FormGroup } from 'reactstrap'


function PostForm({birds, postObj, updatePostObj}){


    const renderOptions = birds.map( bird =>{
        return <option key={bird.id} value={bird.id}>{bird.name}</option>
    })

    return(
        <Card>
            <Form>
                <FormGroup>
                    <Label>Image  URL</Label>
                    <Input value={postObj.image_url} onChange={e=>updatePostObj('image_url', e)}/>
                </FormGroup>

                <FormGroup>
                    <Label>Bird: </Label>
                    <Input type='select'>{renderOptions}</Input>
                    <FormText>Click <a href='#'><strong>here</strong></a> to add new bird to the list</FormText>
                </FormGroup>
    
                <Label>Caption: </Label>
                <Input type='textarea' value={postObj.caption} onChange={e=>updatePostObj('caption',e)}/>
                <Button>Submit</Button>
            </Form>
        </Card>

    )
}

export default PostForm