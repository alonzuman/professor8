import { IconButton, Typography } from '@material-ui/core'
import React from 'react'
import CloseIcon from '@material-ui/icons/Close'

const CustomDialogHeader = ({ onClose, title, subtitle }) => {
  return (
    <div className='header__container rtl'>
      <div>
        <Typography variant='h5'>{title}</Typography>
        <Typography variant='subtitle2'>{subtitle}</Typography>
      </div>
      <IconButton onClick={onClose} style={{ marginLeft: -8 }}><CloseIcon /></IconButton>
    </div>
  )
}

export default CustomDialogHeader
