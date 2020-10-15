import React from 'react'
import { Dialog, IconButton, Typography } from '@material-ui/core'
import heb from '../../utils/translation/heb';
import CloseIcon from '@material-ui/icons/Close';
import EditProfessor from '../../components/forms/EditProfessor';
import CustomDialogHeader from './components/CustomDialogHeader';

const EditProfessorContainer = ({ open, onClose }) => {
  return (
    <Dialog maxWidth='sm' fullWidth open={open} onClose={onClose}>
      <CustomDialogHeader
        title={heb.editProfessor}
        onClose={onClose}
      />
      <EditProfessor onClose={onClose} />
    </Dialog>
  )
}

export default EditProfessorContainer
