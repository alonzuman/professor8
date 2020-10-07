import { Dialog, DialogContent, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import ProfessorCard from '../../components/cards/ProfessorCard'

const SavedListDialog = ({ open, onClose, list, name }) => {
  console.log(list, name)

  return (
    <Dialog maxWidth={'md'} fullWidth dir='rtl' open={open} onClose={onClose}>
      <div className='header__container'>
        <Typography variant='h5'>{name}</Typography>
        <IconButton onClick={onClose} style={{ marginLeft: -8 }}><CloseIcon /></IconButton>
      </div>
      <DialogContent>
          {list?.map((v, i) => <ProfessorCard professor={v} />)}
      </DialogContent>
    </Dialog>
  )
}

export default SavedListDialog
