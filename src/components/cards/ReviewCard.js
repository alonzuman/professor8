import { Card, CardActions, CardContent, CardHeader, Chip, Typography } from '@material-ui/core'
import React from 'react'
import './ReviewCard.css'
import Rating from '../general/Rating';
import ReviewActions from './ReviewActions';
import moment from 'moment'
import 'moment/locale/he'
import heb from '../../utils/translation/heb';
moment.locale('he')

const ReviewCard = ({ review, showActions = true, showProfessor = false }) => {
  const { content, rating, author, dateCreated, tags, wouldTakeAgain, professor } = review

  // TODO set if show professor true an arrow who commented on what professor

  const timeAgo = moment(new Date(dateCreated)).fromNow()
  return (
    <Card className='review_card__container'>
      <CardHeader
        title={author}
        subheader={timeAgo}
        avatar={<Rating rating={rating} icon='star' />}
      />
      <CardContent>
        <div className='mb-1'>
          {tags?.map((v, i) => <Chip key={i} label={v} size='small' className='ml-5 mb-5' />)}
          {wouldTakeAgain && <Chip label={heb.wouldTakeAgain} size='small' className='ml-5 mb-5' />}
        </div>
        <Typography variant='body1'>
          {content}
        </Typography>
      </CardContent>
      {showActions && <ReviewActions review={review} professor={professor} />}
    </Card>
  )
}

export default ReviewCard
