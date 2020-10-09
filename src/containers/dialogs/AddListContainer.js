import { Dialog } from '@material-ui/core'
import React from 'react'
import AddList from '../../components/forms/AddList'
import heb from '../../utils/translation/heb'
import CustomDialogHeader from './components/CustomDialogHeader'

const AddListContainer = ({ open, onClose }) => {
  return (
    <Dialog fullWidth maxWidth='xs' open={open} onClose={onClose}>
      <CustomDialogHeader
        onClose={onClose}
        title={heb.manageLists}
      />
      <AddList />
    </Dialog>
  )
}

export default AddListContainer
