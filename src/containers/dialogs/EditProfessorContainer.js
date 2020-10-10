import React from 'react'
import { Dialog, IconButton, Typography } from '@material-ui/core'
import heb from '../../utils/translation/heb';
import CloseIcon from '@material-ui/icons/Close';
import EditProfessor from '../../components/forms/EditProfessor';
import CustomDialogHeader from './components/CustomDialogHeader';

const EditProfessorContainer = ({ open, onClose }) => {
  return (
    <Dialog maxWidth='md' fullWidth open={open} onClose={onClose}>
      <CustomDialogHeader
        title={heb.editProfessor}
        onClose={onClose}
      />
      <EditProfessor />
    </Dialog>
  )
}

export default EditProfessorContainer
