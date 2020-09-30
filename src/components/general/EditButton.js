import { IconButton } from '@material-ui/core'
import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const EditButton = ({ variant, sticky = false, onClick }) => {
  const buttonStyle = {
    boxShadow: variant === 'contained' ? '0px 0px 10px #00000015' : '',
    position: sticky ? 'sticky' : 'relative',
    top: sticky ? '16px' : '',
    zIndex: 9,
    backgroundColor: 'var(--bg-00)'
  }

  return (
    <IconButton onClick={onClick} style={buttonStyle}>
      <EditIcon />
    </IconButton>
  )
}

export default EditButton
