import { Form, Label, Input, Button, FormText, FormGroup } from 'reactstrap'


function PostForm({birds, postObj, updatePostObj, clickPreview}){

    //   const [ postObj, setPostObj ] = useState({
    //     caption: '',
    //     image_url: '',
    //     bird_id: ''
    // })

    // function updatePostObj(key, e){
    //     const copy = {...postObj}
    //     copy[key] = e.target.value
    //     setPostObj(copy)
    // }

    const renderOptions = birds.map( bird =>{
        return <option key={bird.id} value={bird.id}>{bird.name}</option>
    })

    return(
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
            {/* <Button type='button' onClick={clickPreview}>Preview</Button> */}
            <Button>Submit</Button>
        </Form>
    )
}

export default PostForm