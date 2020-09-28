import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, ListItem, Paper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import './Review.css'
import { deleteReview, downVoteReview, upVoteReview } from '../../actions/professors';
import { useDispatch } from 'react-redux';
import { Skeleton } from '@material-ui/lab';

const ReviewSkeleton = () => {
  return (
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
  )
}

export default ReviewSkeleton
