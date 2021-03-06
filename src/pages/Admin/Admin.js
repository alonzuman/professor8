import { Divider, List, ListItem, ListItemText } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import PageHeader from '../../components/layout/PageHeader'
import heb from '../../utils/translation/heb'

const Admin = () => {
  const history = useHistory()
  const handleMenuClick = path => history.push({ pathname: path })

  return (
    <div className='rtl p-2'>
      <PageHeader title={heb.manage} />
      <List>
        <ListItem onClick={() => handleMenuClick('/admin/approve-reviews')} button>
          <ListItemText>
            {heb.manageReviews}
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem onClick={() => handleMenuClick('/admin/approve-professors')} button>
          <ListItemText>
            {heb.manageProfessors}
          </ListItemText>
        </ListItem>
        <Divider />
      </List>
    </div>
  )
}

export default Admin
