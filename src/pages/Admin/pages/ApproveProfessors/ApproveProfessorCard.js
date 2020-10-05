import { Card, CardActions, CardHeader, Chip, Typography } from '@material-ui/core'
import React from 'react'
import moment from 'moment'
import 'moment/locale/he'
import Rating from '../../../../components/general/Rating'
import ApproveReviewCardActions from '../ApproveReviews/ApproveReviewCardActions'
import { useDispatch } from 'react-redux'
import { adminApproveProfessor, adminDeclineProfessor } from '../../../../actions/admin'
import heb from '../../../../utils/translation/heb'
moment.locale('he')

const ApproveProfessorCard = ({ professor, loading }) => {
  const { name, approved, courses, overallRating, school, tags, uid, dateCreated } = professor;
  const timeAgo = moment(new Date(dateCreated || Date.now())).fromNow()
  const dispatch = useDispatch()

  const handleApprove = () => dispatch(adminApproveProfessor(professor.id))
  const handleDecline = () => dispatch(adminDeclineProfessor(professor.id))

  return (
    <Card className='full__width'>
      <CardHeader
        title={name}
        subheader={timeAgo}
        avatar={<Rating rating={overallRating} />}
      />
      {courses?.length !== 0 &&
      <div className='mb-1 p-1'>
        <Typography variant='subtitle1'>{heb.courses}</Typography>
        {courses?.map((v, i) => <Chip key={i} label={v} size='small' className='ml-5' />)}
      </div>}
      {tags &&
      <div className='mb-1 p-1'>
        <Typography variant='subtitle1'>{heb.tags}</Typography>
        {Object.keys(tags)?.map((v, i) => <Chip key={i} label={v} size='small' className='ml-5' />)}
      </div>}

      <CardActions className='justify__between'>
        <ApproveReviewCardActions loading={loading} handleApprove={handleApprove} handleDecline={handleDecline} />
      </CardActions>
    </Card>
  )
}

export default ApproveProfessorCard
