import { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList';
import { useStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';

const ActivitiesDashboard = () => {

  const {activityStore} = useStore()
  const {loadActivities, activityRegistry} = activityStore

  useEffect(() => {
    activityRegistry.size <= 1 && loadActivities()
  },[loadActivities, activityRegistry])
  
  if(activityStore.loadingInitial) return <LoadingComponent content='Loading activities'/>
  return (
    <Grid>
        <Grid.Column width='10'>
            <ActivityList/>
        </Grid.Column>
        <Grid.Column width='6'>
            <ActivityFilters/>
        </Grid.Column>
    </Grid>
  )
}

export default observer(ActivitiesDashboard)
