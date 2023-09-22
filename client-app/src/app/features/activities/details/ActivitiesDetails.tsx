import { useEffect } from 'react'
import { Grid} from 'semantic-ui-react'
import { useStore } from '../../../stores/store'
import LoadingComponent from '../../../layout/LoadingComponent'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import ActivityDetailedHeader from './ActivityDetailedHeader'
import ActivityDetailedInfo from './ActivityDetailedInfo'
import ActivityDetailedChat from './ActivityDetailedChat'
import ActivityDetailedSidebar from './ActivityDetailedSidebar'

const ActivitiesDetails = () => {

    const {activityStore} = useStore()
    const {selectedActivity : activity, loadActivity, loadingInitial } = activityStore
    const {id} = useParams()

    useEffect(() => {
        if(id) loadActivity(id)
    },[id,loadActivity])

    if(loadingInitial || !activity) return <LoadingComponent />

return (
    <Grid>
        <Grid.Column width={10}>
            <ActivityDetailedHeader activity={activity}/>
            <ActivityDetailedInfo activity={activity}/>
            <ActivityDetailedChat/>
        </Grid.Column>
        <Grid.Column width={6}>
            <ActivityDetailedSidebar/>
        </Grid.Column>
    </Grid>
)
}

export default observer (ActivitiesDetails)
