import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview, downVoteReview, upVoteReview } from '../../actions';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import { CardActions, IconButton, Typography } from '@material-ui/core'
import ApprovalDialog from '../../containers/dialogs/ApprovalDialog';

const ReviewActions = ({ review, professor }) => {
  const { upVotesArray, downVotesArray } = review
  const dispatch = useDispatch()
  const [isDeleting, setIsDeleting] = useState(false)
  const [upVotes, setUpVotes] = useState(upVotesArray)
  const [downVotes, setDownVotes] = useState(downVotesArray)
  const { uid } = useSelector(state => state.auth)
  const { loading } = useSelector(state => state.professors)
  const pid = professor?.id

  const upVoted = upVotes.includes(uid)
  const downVoted = downVotes.includes(uid)

  const handleClick = async type => {
    if (!downVoted && !upVoted) {
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
    <CardActions className='justify__between'>
      <ApprovalDialog loading={loading} open={isDeleting} onClose={() => setIsDeleting(false)} action={handleDelete} />
      <div className='flex align__center justify__center mr-1'>
        <Typography variant='subtitle1'>{upVotes?.length}</Typography>
        <IconButton className='ml-5' disabled={upVoted || upVoted} onClick={() => handleClick('up')}>
          <ThumbUpAltIcon />
        </IconButton>
        <Typography variant='subtitle1'>{downVotes?.length}</Typography>
        <IconButton disabled={downVoted || upVoted} onClick={() => handleClick('down')}>
          <ThumbDownAltIcon />
        </IconButton>
      </div>
      {review?.uid === uid &&
        <IconButton onClick={() => setIsDeleting(true)}>
          <DeleteIcon />
        </IconButton>}
    </CardActions>
  )
}

export default ReviewActions
