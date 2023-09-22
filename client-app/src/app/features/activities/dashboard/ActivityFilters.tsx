import React from 'react'
import Calendar from 'react-calendar'
import { Header, Menu } from 'semantic-ui-react'

const ActivityFilters = () => {
    return (
        <>
            <Menu vertical size='large' style={{width: '100%', marginTop:25}}>
                <Header icon='filter' attached color='teal' content='Filters'/>
                <Menu.Item content='All Activities'/>
                <Menu.Item content="I'm going"/>
                <Menu.Item content="I'm hosting"/>
            </Menu>
            <Header />
            <Calendar />
        </>
        
    )
}

export default ActivityFilters
