import { Card, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function AddBird({addBirdToList}){

    const history = useHistory()
    const [ birdObj, setBirdObj ] = useState({
        name: '',
        description: '',
        image_url: ''
    })
    const [ errors, setErrors ] = useState([])

    function updateBirdObj(key, value){
        const copy = {...birdObj}
        copy[key] = value
        setBirdObj(copy)
    }

    function submitBird(e){
        e.preventDefault()
        fetch('/birds',{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(birdObj)
        })
        .then(res => {
            if(res.ok){
                res.json().then(data => {
                    addBirdToList(data)
                    history.goBack()
                    setBirdObj({
                        name: '',
                        description: '',
                        image_url: ''
                    })
                })
            }else{
                res.json().then(data => setErrors(data.errors))
            }
        })



   
    }

    const renderErrors = errors.map( e => {
        return <p key={e} className='error'>{e}</p>
    })

    return (
        <Card id='addBirdForm'>

            <h3>Add Bird</h3>
            <Form onSubmit={submitBird}>

                <FormGroup className='formGroup'>
                    <Label>Bird Name: </Label>
                    <Input value={birdObj.name} onChange={e=> updateBirdObj('name', e.target.value)} />
                </FormGroup>

                <FormGroup className='formGroup'>
                    <Label>Description: </Label>
                    <Input value={birdObj.description} onChange={e=> updateBirdObj('description', e.target.value)}type='textarea' />
                </FormGroup>

                <FormGroup className='formGroup'>
                    <Label>Image URL: </Label>
                    <Input value={birdObj.image_url} onChange={e=> updateBirdObj('image_url', e.target.value)} />
                </FormGroup>

                <Button>Submit</Button>
                <Button onClick={()=> history.goBack()} type='button'>Back</Button>

            </Form>

            { errors.length > 0 ? renderErrors : null}
        </Card>
    )
}

export default AddBird