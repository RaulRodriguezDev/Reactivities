import { Header } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';
import ActivityListItem from './ActivityListItem';
import { Fragment } from 'react';

const ActivityList = () => {
    const {activityStore} = useStore()
    const {groupedActivities} = activityStore


return (
    <>
        {groupedActivities.map(([group,activities],index) => (
            <Fragment key={index}>
                <Header sub color='teal'>
                    {group}
                </Header>
                    {activities.map(activity =>(
                        <ActivityListItem key={activity.id} activity={activity}/>
                    ))}
            </Fragment>
        ))}
    </>
)
}

export default observer(ActivityList)
