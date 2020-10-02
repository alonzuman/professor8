import { Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import './ReviewCard.css'
import { Skeleton } from '@material-ui/lab';

const ReviewSkeleton = () => {
  return (
    <div className='review_card__wrapper'>
      <Card className='review_card__container'>
        <CardHeader
          title={<Skeleton width={120} />}
          avatar={<Skeleton height={40} width={40} variant='circle' />}
        />
        <CardContent>
          <Typography variant='body1'><Skeleton width={'100%'} /></Typography>
          <Typography variant='body1'><Skeleton width={'100%'} /></Typography>
        </CardContent>
        <CardActions>
          <div className='flex align__center  justify__center'>
            <IconButton>
              <Skeleton variant='circle' height={32} width={32} />
            </IconButton>
            <Typography variant='subtitle1'><Skeleton width={40} /></Typography>
            <IconButton>
              <Skeleton variant='circle' height={32} width={32} />
            </IconButton>
          </div>
          <IconButton>
            <Skeleton height={32} width={32} variant='circle' />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  )
}

export default ReviewSkeleton
