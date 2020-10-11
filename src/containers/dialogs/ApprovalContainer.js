import { Button, CircularProgress, Dialog, DialogActions, DialogContent, Typography } from '@material-ui/core'
import React from 'react'
import heb from '../../utils/translation/heb'
import CustomDialogHeader from './components/CustomDialogHeader'

const ApprovalContainer = ({ open, onClose, action, loading }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <CustomDialogHeader title='' onClose={onClose} />
      <DialogContent className='flex flex__column align__center justify__around'>
        <Typography className='rtl' variant='h4'>
          {heb.areYouSure}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} className='full__width' onClick={action} variant='contained' color='primary'>{loading ? <CircularProgress className='spinner__small' /> : heb.approve}</Button>
        <Button disabled={loading} className='full__width ml-1' onClick={onClose} variant='outlined' color='default'>{heb.decline}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ApprovalContainer
