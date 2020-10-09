import React from 'react';
import { CircularProgress, Dialog, DialogContent, IconButton, Typography } from '@material-ui/core';
import AddProfessorAndReview from '../../components/forms/AddProfessorAndReview';
import heb from '../../utils/translation/heb';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';
import CustomDialogHeader from './components/CustomDialogHeader';

const AddProfessorAndReviewContainer = ({ open, onClose }) => {
  const tags = useSelector(state => state.tags)
  const { loading } = useSelector(state => state.tags)

  return (
    <Dialog scroll='body' fullWidth maxWidth='xs' dir='rtl' open={open} onClose={onClose}>
      {(!tags || loading) && <CircularProgress />}
      {tags && !loading &&
        <>
        <CustomDialogHeader
          onClose={onClose}
          title={heb.addReview}
        />
        <DialogContent>
          <AddProfessorAndReview onClose={onClose} />
        </DialogContent>
      </>}
    </Dialog>
  )
}

export default AddProfessorAndReviewContainer
