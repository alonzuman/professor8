import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, ListItem, Paper, Typography } from '@material-ui/core'
import React from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import './Review.css'

const Review = ({ review }) => {
  const { pid, content, rating, author, avatar, upVotes, downVotes } = review
  console.log(review)
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
          <div onClick={() => console.log('liked')} className='flex align__center  justify__center'>
            <IconButton>
              <ThumbDownAltIcon />
            </IconButton>
            <Typography variant='subtitle1'>{upVotes}</Typography>
          </div>
          <div className='flex align__center  justify__center'>
            <IconButton>
              <ThumbUpAltIcon />
            </IconButton>
            <Typography variant='subtitle1'>{downVotes}</Typography>
          </div>
        </CardActions>
      </Card>
  )
}

export default Review
