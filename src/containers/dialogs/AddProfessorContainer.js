import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import AddProfessor from '../../components/forms/AddProfessor';

const AddProfessorContainer = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Professor</DialogTitle>
      <DialogContent>
        <AddProfessor />
      </DialogContent>
    </Dialog>
  )
}

export default AddProfessorContainer
