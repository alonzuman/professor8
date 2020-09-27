import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogContent, IconButton, ListItem, Paper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import './Review.css'
import { deleteReview, downVoteReview, upVoteReview } from '../../actions/professors';
import { useDispatch } from 'react-redux';
import heb from '../../utils/translation/heb';

const Review = ({ review, professor }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const { pid, content, rating, author, avatar, upVotesArray, downVotesArray, votes } = review
  const [votesCount, setVotesCount] = useState(votes)
  const dispatch = useDispatch()

  const handleClick = type => {
    // Check if user is not in any of the vote arrays
    if (type === 'up') {
      dispatch(upVoteReview(review))
      setVotesCount(votesCount + 1)
    } else {
      dispatch(downVoteReview(review))
      setVotesCount(votesCount - 1)
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
          avatar={<Avatar src={avatar} alt={author}>{author && author[0]}</Avatar>}
        />
        <CardContent>
          <Typography variant='body1'>
            {content}
          </Typography>
          {/* <h3>{rating}</h3> */}
        </CardContent>
        <CardActions className='justify__between'>
          <div className='flex align__center  justify__center'>
            <IconButton onClick={() => handleClick('up')}>
              <ThumbUpAltIcon />
            </IconButton>
            <Typography variant='body1'>{votesCount}</Typography>
            <IconButton onClick={() => handleClick('down')}>
              <ThumbDownAltIcon />
            </IconButton>
          </div>
          <IconButton onClick={() => setIsDeleting(true)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
  )
}

export default Review
