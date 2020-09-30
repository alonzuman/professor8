import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview, downVoteReview, upVoteReview } from '../../actions/professors';
import heb from '../../utils/translation/heb';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Dialog, DialogContent, IconButton, ListItem, Paper, Typography } from '@material-ui/core'

const ReviewActions = ({ review, professor }) => {
  const { upVotesArray, downVotesArray } = review
  const dispatch = useDispatch()
  const [isDeleting, setIsDeleting] = useState(false)
  const [upVotes, setUpVotes] = useState(upVotesArray)
  const [downVotes, setDownVotes] = useState(downVotesArray)
  const { uid } = useSelector(state => state.auth)
  const pid = professor.id

  const handleClick = async type => {
    if (!downVotes.includes(uid) && !upVotes.includes(uid)) {
      if (type === 'up') {
        await dispatch(upVoteReview({ review, uid, pid }))
        setUpVotes([...upVotes, uid])
      } else {
        await dispatch(downVoteReview({ review, uid, pid }))
        setDownVotes([...downVotes, uid])
      }
    }
  }

  const handleDelete = async () => {
    await dispatch(deleteReview({ review, professor }))
    setIsDeleting(false)
  }

  return (
    <>
      <Dialog open={isDeleting} onClose={() => setIsDeleting(false)}>
        <DialogContent className='flex mh-128 flex__column align__center justify__around'>
          <Typography className='rtl' variant='h4'>
            {heb.areYouSure}
          </Typography>
          <div>
            <Button onClick={handleDelete} variant='contained' color='primary'>{heb.approve}</Button>
            <Button className='ml-1' onClick={() => setIsDeleting(false)} variant='outlined' color='default'>{heb.decline}</Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className='flex align__center  justify__center'>
        <Typography variant='h5'>{upVotes?.length}</Typography>
        <IconButton onClick={() => handleClick('up')}>
          <ThumbUpAltIcon />
        </IconButton>
        <Typography variant='h5'>{downVotes?.length}</Typography>
        <IconButton onClick={() => handleClick('down')}>
          <ThumbDownAltIcon />
        </IconButton>
      </div>
      {review?.uid === uid &&
        <IconButton onClick={() => setIsDeleting(true)}>
          <DeleteIcon />
        </IconButton>}
    </>
  )
}

export default ReviewActions
