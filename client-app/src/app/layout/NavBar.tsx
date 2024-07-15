import { Button, Container, Dropdown, DropdownMenu, Image, Menu } from 'semantic-ui-react'
import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../stores/store'
import { observer } from 'mobx-react-lite'

const NavBar = () => {
  const { userStore: { user, logout } } = useStore()
  return (
    <Menu inverted fixed='top'>
        <Container>
            <Menu.Item as={NavLink} to='/' header>
                <img src="../assets/logo.png" alt='logo' style={{marginRight: '10px'}}/>
                Reactivities
            </Menu.Item>
            <Menu.Item as={NavLink} to='/activities' name='Activities'/>
            <Menu.Item as={NavLink} to='/errors' name='Errors'/>
            <Menu.Item>
                <Button as={NavLink} to='/createActivity' positive content='Create Activity'/>
            </Menu.Item>
            <Menu.Item position='right'>
              <Image src={user?.image || '/assets/user.png'} avatar spaced='right'/>
              <Dropdown pointing='top left' text={user?.displayName}>
                <DropdownMenu>
                  <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My Profile' icon='user'/>
                  <Dropdown.Item onClick={logout} text='Logout' icon='power'/>
                </DropdownMenu>
              </Dropdown>
            </Menu.Item>
        </Container>
    </Menu>
  )
}

export default observer (NavBar)
