import { useEffect, useState } from 'react'
import { Button, Header, Segment } from 'semantic-ui-react'
import { useStore } from '../../../stores/store'
import { observer } from 'mobx-react-lite'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Activity } from '../../../models/activity'
import LoadingComponent from '../../../layout/LoadingComponent'
import { v4 as uuid } from 'uuid'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../../common/form/MyTextInput'
import MyTextArea from '../../../common/form/MyTextArea'
import MySelectInput from '../../../common/form/MySelectInput'
import categoryOptions from '../../../common/options/category'
import MyDateInput from '../../../common/form/MyDateInput'

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
    date: null,
    city:'',
    venue:''
  })

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required'),
    description: Yup.string().required('The activity description is required'),
    category: Yup.string().required(),
    date: Yup.string().required('Date is required'),
    venue: Yup.string().required(),
    city: Yup.string().required()
  })

  useEffect(() => {
    if(id) loadActivity(id).then(activity => setActivity(activity!))
  },[id, loadActivity])

  function handleFormSubmit(activity: Activity) {
    if(!activity.id){
      activity.id = uuid()
      createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    }
    else{
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`)) 
    }

  }

  loadingInitial && <LoadingComponent/>

  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal'/>
      <Formik enableReinitialize initialValues={activity} onSubmit={values => handleFormSubmit(values)} validationSchema={validationSchema}>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput name='title' placeholder='Title'/>
            <MyTextArea rows={3} placeholder='Description' name='description'/>
            <MySelectInput options={categoryOptions} name='category' placeholder='Category'/>
            <MyDateInput 
              name='date' 
              placeholderText='Date'
              showTimeSelect
              timeCaption='time'
              dateFormat= 'MMMM d, yyyy h:mm aa'
            />
            <Header content='Location Details' sub color='teal'/>
            <MyTextInput name='city' placeholder='City'/>
            <MyTextInput name='venue' placeholder='Venue'/>
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading} 
              floated='right' 
              positive 
              type='submit' 
              content='Submit'
            />
            <Button as={Link} to='/activities' floated='right' type='button' content='Cancel'/>
          </Form>)}
      </Formik>
    </Segment>
  )
}

export default observer(ActivityForm)
