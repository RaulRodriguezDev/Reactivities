import React, { useEffect, useState } from 'react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import ActivitiesDashboard from '../features/activities/ActivitiesDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {

  const [activities,setActivities]=useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities: Activity[] = [];

      response.forEach(activity => {
        activity.date = activity.date.split('T')[0]
        activities.push(activity)
      })
      setActivities(activities);
      setLoading(false)
    })
  },[])

  function handleSelectActivity(id : string){
    setSelectedActivity(activities.find(a => a.id === id))
  }

  function handleFormOpen(id? : string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity()
    setEditMode(true)
  }

  function handleCreateOrEditActivity(activity : Activity) {
    setSubmitting(true)    
    if(activity.id){
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(a => a.id !== activity.id),activity])
      })
    }
    else{
      activity.id = uuid()
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity])
      })
    }
    setEditMode(false)
    setSelectedActivity(activity)
    setSubmitting(false)
  }

  function handleDelete(id: string) {
    setSubmitting(true)
    agent.Activities.delete(id).then(() => {
      setSubmitting(false)
      setActivities([...activities.filter(a => a.id !== id)])
    })
    
  }
  const handleFormClose = () => setEditMode(false)
  const handleCancelSelectActivity = () => setSelectedActivity(undefined)
  
  if(loading) return <LoadingComponent content='Loading app'/>

  return (
    <>
      <NavBar openForm = {handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivitiesDashboard 
          activities={activities} 
          selectedActivity = {selectedActivity} 
          selectActivity = {handleSelectActivity}
          cancelActivity = {handleCancelSelectActivity}
          editMode = {editMode}
          openForm = {handleFormOpen}
          closeForm = {handleFormClose}
          upsertHandler = {handleCreateOrEditActivity}
          handleDelete = {handleDelete}
          submitting={submitting}
          />
      </Container>
    </>
  );
}

export default App;