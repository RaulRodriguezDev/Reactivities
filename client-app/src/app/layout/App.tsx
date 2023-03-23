import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import ActivitiesDashboard from '../features/activities/ActivitiesDashboard';
import {v4 as uuid} from 'uuid';

function App() {

  const [activities,setActivities]=useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
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
    activity.id ? 
      setActivities([...activities.filter(a => a.id !== activity.id),activity])
      : setActivities([...activities,{...activity, id: uuid()}])
    setEditMode(false)
    setSelectedActivity(activity)
  }

  function handleDelete(id: string) {
    setActivities([...activities.filter(a => a.id !== id)])
  }
  const handleFormClose = () => setEditMode(false)
  const handleCancelSelectActivity = () => setSelectedActivity(undefined)
  
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
          />
      </Container>
    </>
  );
}

export default App;