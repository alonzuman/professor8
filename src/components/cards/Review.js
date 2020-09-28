import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogContent, IconButton, ListItem, Paper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import './Review.css'
import { deleteReview, downVoteReview, upVoteReview } from '../../actions/professors';
import { useDispatch, useSelector } from 'react-redux';
import heb from '../../utils/translation/heb';
import Rating from '../general/Rating';

const Review = ({ review, professor }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const { pid, content, rating, author, avatar, upVotesArray, downVotesArray, votes } = review
  const { uid } = useSelector(state => state.auth)
  const [votesCount, setVotesCount] = useState(votes)
  const [upVoted, setUpVoted] = useState(upVotesArray?.includes(uid) || false)
  const [downVoted, setDownVoted] = useState(downVotesArray?.includes(uid) || false)
  const dispatch = useDispatch()

  const handleClick = type => {
    if (type === 'up' && downVoted) {
      dispatch(upVoteReview({ review, uid }))
      setVotesCount(votesCount + 1)
      setUpVoted(true)
      setDownVoted(false)
    } else if (type === 'down' &&  upVoted) {
      dispatch(downVoteReview({ review, uid }))
      setVotesCount(votesCount - 1)
      setUpVoted(false)
      setDownVoted(true)
    }
  }

  return (
      <Card className='review_card__container'>
        <Dialog open={isDeleting} onClose={() => setIsDeleting(false)}>
          <DialogContent>
            <Typography variant='body1'>
              {heb.areYouSure}
            </Typography>
            <Button onClick={() => dispatch(deleteReview({ review, professor }))} variant='contained' color='primary'>{heb.approve}</Button>
            <Button onClick={() => setIsDeleting(false)} variant='outlined' color='default'>{heb.decline}</Button>
          </DialogContent>
        </Dialog>
        <CardHeader
          title={author}
          avatar={<Rating rating={rating} />}
        />
        <CardContent>
          <Typography variant='body1'>
            {content}
          </Typography>
        </CardContent>
        <CardActions className='justify__between'>
          <div className='flex align__center  justify__center'>
            <IconButton disabled={upVoted} onClick={() => handleClick('up')}>
              <ThumbUpAltIcon />
            </IconButton>
            <Typography variant='h5'>{votesCount}</Typography>
            <IconButton disabled={downVoted} onClick={() => handleClick('down')}>
              <ThumbDownAltIcon />
            </IconButton>
          </div>
          {review?.uid === uid &&
          <IconButton onClick={() => setIsDeleting(true)}>
            <DeleteIcon />
          </IconButton>}
        </CardActions>
      </Card>
  )
}

export default Review
