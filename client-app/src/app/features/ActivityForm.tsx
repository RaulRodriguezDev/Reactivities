import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../models/activity'

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  upsertHandler: (activity: Activity) => void
}

const ActivityForm = ({activity: selectedActivity, closeForm, upsertHandler}: Props) => {

  const initialState = selectedActivity ?? {
    id: '',
    title:'',
    category:'',
    description:'',
    date:'',
    city:'',
    venue:''
  }

  const [activity, setActivity] = useState(initialState)

  function handleSubmit() {
    upsertHandler(activity)
  }

  function handleInputChange (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = e.target
    setActivity({...activity,[name]:value})

  }
  return (
    <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete='off'>
            <Form.Input value={activity.title} name='title' placeholder='Title' onChange={handleInputChange} />
            <Form.TextArea value={activity.description} name='description' placeholder='Description' onChange={handleInputChange}/>
            <Form.Input value={activity.category}  name='category' placeholder='Category' onChange={handleInputChange}/>
            <Form.Input value={activity.date} name='date' placeholder='Date' onChange={handleInputChange}/>
            <Form.Input value={activity.city} name='city' placeholder='City' onChange={handleInputChange}/>
            <Form.Input value={activity.venue} name='venue' placeholder='Venue' onChange={handleInputChange}/>
            <Button floated='right' positive type='submit' content='Submit'/>
            <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
        </Form>
    </Segment>
  )
}

export default ActivityForm
