import React, { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import heb from '../../../../../utils/translation/heb';
import ApprovalContainer from '../../../../../containers/dialogs/ApprovalContainer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSavedList } from '../../../../../actions/saved';
import { useHistory } from 'react-router-dom';

const EditList = () => {
  const { loading, list } = useSelector(state => state.saved)
  const [anchorEl, setAnchorEl] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleDelete = async () => {
    await dispatch(deleteSavedList(list))
    setIsDeleting(false)
    history.goBack()
  }

  const handleOpen = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = e => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton onClick={handleOpen} className='bg-01'><MoreVertIcon /></IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => setIsDeleting(true)}>{heb.deleteList}</MenuItem>
        <MenuItem>{heb.editList}</MenuItem>
      </Menu>
      <ApprovalContainer open={isDeleting} onClose={() => setIsDeleting(false)} loading={loading} action={handleDelete} />
    </>
  )
}

export default EditList
