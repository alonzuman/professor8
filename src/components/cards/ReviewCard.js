import { Card, CardActions, CardContent, CardHeader, Chip, Typography } from '@material-ui/core'
import React from 'react'
import './ReviewCard.css'
import Rating from '../general/Rating';
import ReviewActions from './ReviewActions';
import moment from 'moment'
import 'moment/locale/he'
import heb from '../../utils/translation/heb';
moment.locale('he')

const Review = ({ review, professor }) => {
  const { content, rating, author, dateCreated, tags, wouldTakeAgain } = review

  const timeAgo = moment(new Date(dateCreated)).fromNow()
  return (
    <div className='review_card__wrapper'>
      <Card className='review_card__container'>
        <CardHeader
          title={author}
          subheader={timeAgo}
          avatar={<Rating rating={rating} icon='star' />}
        />
        <CardContent>
          <div className='mb-1'>
            {tags?.map((v, i) => <Chip key={i} label={v} size='small' className='ml-5 mb-5' />)}
            {wouldTakeAgain && <Chip label={heb.wouldTakeAgain} size='small' className='ml-4' />}
          </div>
          <Typography variant='body1'>
            {content}
          </Typography>
        </CardContent>
        <CardActions className='justify__between'>
          <ReviewActions review={review} professor={professor} />
        </CardActions>
      </Card>
    </div>
  )
}

export default Review