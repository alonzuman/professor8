import React from 'react';
import { CircularProgress, Dialog, DialogContent, IconButton, Typography } from '@material-ui/core';
import AddProfessorAndReview from '../../components/forms/AddProfessorAndReview';
import heb from '../../utils/translation/heb';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';

const AddProfessorAndReviewContainer = ({ open, onClose }) => {
  const tags = useSelector(state => state.tags)
  const { loading } = useSelector(state => state.tags)

  return (
    <Dialog scroll='body' fullWidth maxWidth='xs' dir='rtl' open={open} onClose={onClose}>
      {!tags || loading && <CircularProgress />}
      {tags && !loading &&
        <>
        <div className='header__container'>
          <Typography variant='h5'>{heb.addReview}</Typography>
          <IconButton onClick={onClose} style={{ marginLeft: -8 }}><CloseIcon /></IconButton>
        </div>
        <DialogContent>
          <AddProfessorAndReview onClose={onClose} />
        </DialogContent>
      </>}
    </Dialog>
  )
}

export default AddProfessorAndReviewContainer
