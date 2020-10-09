import React from 'react'
import { Dialog } from '@material-ui/core'
import heb from '../../utils/translation/heb'
import CustomDialogHeader from './components/CustomDialogHeader';
import SaveProfessor from '../../components/forms/components/SaveProfessor';

const SaveProfessorContainer = ({ open, onClose, action }) => {
  return (
    <Dialog dir='rtl' fullWidth maxWidth={'sm'} open={open} onClose={onClose}>
      <CustomDialogHeader
        title={heb.saveProfessor}
        onClose={onClose}
      />
      <SaveProfessor action={action} />
    </Dialog>
  )
}

export default SaveProfessorContainer
