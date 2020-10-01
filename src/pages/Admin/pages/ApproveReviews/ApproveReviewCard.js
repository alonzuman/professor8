import { Card, CardActions, CardContent, CardHeader, Chip, Typography } from '@material-ui/core'
import React from 'react'
import Rating from '../../../../components/general/Rating'
import heb from '../../../../utils/translation/heb'
import moment from 'moment'
import 'moment/locale/he'
import ApproveReviewCardActions from './ApproveReviewCardActions'
moment.locale('he')

const ApproveReviewCard = ({ review }) => {
  const { author, dateCreated, rating, tags, wouldTakeAgain, content } = review;
  const timeAgo = moment(new Date(dateCreated)).fromNow()

  return (
    <Card className='review_card__container rtl'>
      <CardHeader
        title={author}
        subheader={timeAgo}
        avatar={<Rating rating={rating} />}
      />
      <CardContent>
        <div className='mb-1'>
          {tags?.map((v, i) => <Chip key={i} label={v} size='small' className='ml-5' />)}
          {wouldTakeAgain && <Chip label={heb.wouldTakeAgain} size='small' className='ml-4' />}
        </div>
        <Typography variant='body1'>
          {content}
        </Typography>
      </CardContent>
      <CardActions className='justify__between'>
        <ApproveReviewCardActions review={review} />
      </CardActions>
    </Card>
  )
}

export default ApproveReviewCard
