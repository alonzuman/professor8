import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, ListItem, Paper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import './Review.css'
import { deleteReview, downVoteReview, upVoteReview } from '../../actions/professors';
import { useDispatch } from 'react-redux';

const Review = ({ review, professor }) => {
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
        <CardActions>
          <div className='flex align__center  justify__center'>
            <IconButton onClick={() => handleClick('up')}>
              <ThumbUpAltIcon />
            </IconButton>
            <Typography variant='subtitle1'>{votesCount}</Typography>
            <IconButton onClick={() => handleClick('down')}>
              <ThumbDownAltIcon />
            </IconButton>
          </div>
          <IconButton onClick={() => dispatch(deleteReview({ review, professor }))}>
            remove
          </IconButton>
        </CardActions>
      </Card>
  )
}

export default Review
