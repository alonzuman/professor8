import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogContent, IconButton, ListItem, Paper, Typography } from '@material-ui/core'
import React from 'react'
import './Review.css'
import Rating from '../general/Rating';
import ReviewActions from './ReviewActions';
import moment from 'moment'
import 'moment/locale/he'
moment.locale('he')

const Review = ({ review, professor }) => {
  const { content, rating, author, dateCreated } = review

  const timeAgo = moment(new Date(dateCreated)).fromNow()
  return (
      <Card className='review_card__container'>
        <CardHeader
          title={author}
          subheader={timeAgo}
          avatar={<Rating rating={rating} icon='star' />}
        />
        <CardContent>
          <Typography variant='body1'>
            {content}
          </Typography>
        </CardContent>
        <CardActions className='justify__between'>
          <ReviewActions review={review} professor={professor} />
        </CardActions>
      </Card>
  )
}

export default Review
