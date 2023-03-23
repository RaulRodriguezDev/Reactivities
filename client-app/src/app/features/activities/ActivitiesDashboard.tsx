import React from 'react'
import { Grid } from 'semantic-ui-react'
import { Activity } from '../../models/activity'
import ActivitiesDetails from '../ActivitiesDetails';
import ActivityForm from '../ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities : Activity[];
    selectedActivity : Activity | undefined;
    selectActivity: (id : string) => void;
    cancelActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    upsertHandler: (activity : Activity) => void
    handleDelete: (id: string) => void

}

const ActivitiesDashboard = ({activities,handleDelete, selectedActivity, selectActivity, cancelActivity, 
          editMode, openForm, closeForm, upsertHandler} : Props) => {
  return (
    <Grid>
        <Grid.Column width='10'>
            <ActivityList activities={activities} selectActivity = {selectActivity} handleDelete = {handleDelete}/>
        </Grid.Column>
        <Grid.Column width='6'>
            {selectedActivity && !editMode &&
            <ActivitiesDetails 
              activity={selectedActivity} 
              cancelActivity={cancelActivity}
              openForm = {openForm}
            />}
            {editMode &&
            <ActivityForm closeForm = {closeForm} activity = {selectedActivity} upsertHandler ={upsertHandler}/>}
        </Grid.Column>
    </Grid>
  )
}

export default ActivitiesDashboard
