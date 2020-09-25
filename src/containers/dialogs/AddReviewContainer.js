import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import AddReview from '../../components/forms/AddReview'

const AddReviewContainer = ({ open, onClose, professor }) => {
  return (
    <Dialog fullWidth maxWidth='sm' open={open} onClose={onClose}>
      <DialogTitle>Add Review</DialogTitle>
      <DialogContent>
        <AddReview onClose={onClose} professor={professor} />
      </DialogContent>
    </Dialog>
  )
}

export default AddReviewContainer
