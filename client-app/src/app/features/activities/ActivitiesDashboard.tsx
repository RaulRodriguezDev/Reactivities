import React from 'react'
import { Grid } from 'semantic-ui-react'
import ActivitiesDetails from '../ActivitiesDetails';
import ActivityForm from '../ActivityForm';
import ActivityList from './ActivityList';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';

const ActivitiesDashboard = () => {

  const {activityStore} = useStore()
  const { selectedActivity, editMode } = activityStore
  return (
    <Grid>
        <Grid.Column width='10'>
            <ActivityList/>
        </Grid.Column>
        <Grid.Column width='6'>
            {selectedActivity && !editMode &&
            <ActivitiesDetails />}
            {editMode &&
            <ActivityForm />}
        </Grid.Column>
    </Grid>
  )
}

export default observer(ActivitiesDashboard)
