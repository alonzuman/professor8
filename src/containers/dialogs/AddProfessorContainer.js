import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core';
import AddProfessor from '../../components/forms/AddProfessor';
import heb from '../../utils/translation/heb';
import CloseIcon from '@material-ui/icons/Close';

const AddProfessorContainer = ({ open, onClose }) => {
  const headerStyle = {
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }

  return (
    <Dialog fullWidth maxWidth='md' dir='rtl' open={open} onClose={onClose}>
      <div style={headerStyle}>
        <Typography variant='h5'>{heb.addProfessor}</Typography>
        <IconButton onClick={onClose} style={{ marginLeft: -8 }}><CloseIcon /></IconButton>
      </div>
      <DialogContent>
        <AddProfessor onClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}

export default AddProfessorContainer
