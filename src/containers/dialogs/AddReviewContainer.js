import { Dialog, DialogContent, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import AddReview from '../../components/forms/AddReview'
import CloseIcon from '@material-ui/icons/Close'
import heb from '../../utils/translation/heb'
import CustomDialogHeader from './components/CustomDialogHeader'

const AddReviewContainer = ({ open, onClose, professor }) => {
  return (
    <Dialog dir='rtl' fullWidth maxWidth='sm' open={open} onClose={onClose}>
      <CustomDialogHeader
        title={heb.addReview}
        onClose={onClose}
      />
      <DialogContent>
        <AddReview onClose={onClose} professor={professor} />
      </DialogContent>
    </Dialog>
  )
}

export default AddReviewContainer
