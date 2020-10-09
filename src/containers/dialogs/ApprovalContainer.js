import { Button, CircularProgress, Dialog, DialogContent, Typography } from '@material-ui/core'
import React from 'react'
import heb from '../../utils/translation/heb'

const ApprovalContainer = ({ open, onClose, action, loading }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className='flex mh-128 flex__column align__center justify__around'>
        <Typography className='rtl' variant='h4'>
          {heb.areYouSure}
        </Typography>
        <div>
          <Button disabled={loading} onClick={action} variant='contained' color='primary'>{loading ? <CircularProgress className='spinner__small' /> : heb.approve}</Button>
          <Button disabled={loading} className='ml-1' onClick={onClose} variant='outlined' color='default'>{heb.decline}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ApprovalContainer
