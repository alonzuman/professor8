import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core';
import AddProfessor from '../../components/forms/AddProfessor';
import heb from '../../utils/translation/heb';
import CloseIcon from '@material-ui/icons/Close';

const AddProfessorContainer = ({ open, onClose }) => {
  return (
    <Dialog fullWidth maxWidth='xs' dir='rtl' open={open} onClose={onClose}>
      <div className='header__container'>
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
