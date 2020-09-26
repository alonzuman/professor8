import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import AddProfessor from '../../components/forms/AddProfessor';
import heb from '../../utils/translation/heb';

const AddProfessorContainer = ({ open, onClose }) => {
  return (
    <Dialog fullWidth maxWidth='md' dir='rtl' open={open} onClose={onClose}>
      <DialogTitle>{heb.addProfessor}</DialogTitle>
      <DialogContent>
        <AddProfessor />
      </DialogContent>
    </Dialog>
  )
}

export default AddProfessorContainer
