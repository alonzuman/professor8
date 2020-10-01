import { Button, List, ListItem, ListItemText, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { signOut } from '../../actions/auth'

const Admin = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSignOut = () => {
    dispatch(signOut())
  }

  const handleMenuClick = path => history.push({ pathname: path })

  return (
    <>
      <Typography variant='h1'>Admin Home</Typography>
      <List>
        <ListItem onClick={() => handleMenuClick('/admin/approve-reviews')} button>
          <ListItemText>
            Reviews
          </ListItemText>
        </ListItem>
      </List>
      <Button onClick={handleSignOut}>Log Out</Button>
    </>
  )
}

export default Admin
