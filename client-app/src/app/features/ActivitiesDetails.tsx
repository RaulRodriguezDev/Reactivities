import React from 'react'
import { Button, Card, Image} from 'semantic-ui-react'
import { useStore } from '../stores/store'
import LoadingComponent from '../layout/LoadingComponent'

const ActivitiesDetails = () => {

    const {activityStore} = useStore()
    const {selectedActivity : activity, openForm, cancelSelectedActivity} = activityStore

    if(!activity) return <LoadingComponent />;
  return (
    <Card fluid>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
        <Card.Content>
            <Card.Header>{activity.title}</Card.Header>
            <Card.Meta>
                <span>{activity.date}</span>
            </Card.Meta>
            <Card.Description>
                {activity.description}
            </Card.Description>
            </Card.Content>
        <Card.Content extra>
            <Button.Group widths='2'>
                <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit'/>
                <Button onClick={cancelSelectedActivity} basic color='grey' content='Close'/>
            </Button.Group>
        </Card.Content>
    </Card>
  )
}

export default ActivitiesDetails
