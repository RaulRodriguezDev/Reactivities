import { ChangeEvent, useEffect, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useStore } from '../../../stores/store'
import { observer } from 'mobx-react-lite'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Activity } from '../../../models/activity'
import LoadingComponent from '../../../layout/LoadingComponent'
import { v4 as uuid } from 'uuid'

const ActivityForm = () => {
  const {activityStore} = useStore()
  const { createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore
  const {id} = useParams()
  const navigate = useNavigate()

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title:'',
    category:'',
    description:'',
    date:'',
    city:'',
    venue:''
  })



  useEffect(() => {
    if(id) loadActivity(id).then(activity => setActivity(activity!))
  },[id, loadActivity])

  function handleSubmit() {
    if(!activity.id){
      activity.id = uuid()
      createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    }
    else{
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`)) 
    }

  }

  function handleInputChange (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = e.target
    setActivity({...activity,[name]:value})

  }

  loadingInitial && <LoadingComponent/>

  return (
    <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete='off'>
            <Form.Input value={activity.title} name='title' placeholder='Title' onChange={handleInputChange} />
            <Form.TextArea value={activity.description} name='description' placeholder='Description' onChange={handleInputChange}/>
            <Form.Input value={activity.category}  name='category' placeholder='Category' onChange={handleInputChange}/>
            <Form.Input type='date' value={activity.date} name='date' placeholder='Date' onChange={handleInputChange}/>
            <Form.Input value={activity.city} name='city' placeholder='City' onChange={handleInputChange}/>
            <Form.Input value={activity.venue} name='venue' placeholder='Venue' onChange={handleInputChange}/>
            <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
            <Button as={Link} to='/activities' floated='right' type='button' content='Cancel'/>
        </Form>
    </Segment>
  )
}

export default observer(ActivityForm)
