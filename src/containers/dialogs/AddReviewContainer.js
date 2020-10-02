import { Dialog, DialogContent, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import AddReview from '../../components/forms/AddReview'
import CloseIcon from '@material-ui/icons/Close'
import heb from '../../utils/translation/heb'

const AddReviewContainer = ({ open, onClose, professor }) => {
  return (
    <Dialog dir='rtl' fullWidth maxWidth='sm' open={open} onClose={onClose}>
      <div className='header__container'>
        <Typography variant='h5'>{heb.addReview}</Typography>
        <IconButton onClick={onClose} style={{ marginLeft: -8 }}><CloseIcon /></IconButton>
      </div>
      <DialogContent>
        <AddReview onClose={onClose} professor={professor} />
      </DialogContent>
    </Dialog>
  )
}

export default AddReviewContainer
