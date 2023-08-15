import React, { useEffect} from 'react';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import ActivitiesDashboard from '../features/activities/ActivitiesDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const {activityStore} = useStore()

  useEffect(() => {
    activityStore.loadActivities()
  },[activityStore])
  
  if(activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ActivitiesDashboard />
      </Container>
    </>
  );
}

export default observer(App);