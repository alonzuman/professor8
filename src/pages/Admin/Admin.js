import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signOut } from '../../actions/auth'
import PageHeader from '../../components/layout/PageHeader'
import heb from '../../utils/translation/heb'

const Admin = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSignOut = () => {
    dispatch(signOut())
  }

  const handleMenuClick = path => history.push({ pathname: path })

  return (
    <div className='rtl'>
      <PageHeader title={heb.manage} />
      <List>
        <ListItem onClick={() => handleMenuClick('/admin/approve-reviews')} button>
          <ListItemText>
            {heb.manageReviews}
          </ListItemText>
        </ListItem>
      </List>
    </div>
  )
}

export default Admin
