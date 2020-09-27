import { Chip, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import heb from '../../utils/translation/heb'

const FieldOfResearch = ({ fieldOfResearch, loading }) => {
  return (
    <div className='page__section'>
      <Typography variant='subtitle1'>{!loading ? fieldOfResearch?.length > 0 ? heb.fieldOfResearch : '' : <Skeleton width={120} />}</Typography>
      <div className='reviews_list__container'>
        {loading && [0, 0, 0, 0].map((v, i) => <Chip size='small' key={i} style={{ width: 120 }} />)}
        {!loading && fieldOfResearch?.map((v, i) => <Chip size='small' variant='outlined' key={i} label={v} />)}
      </div>
    </div>
  )
}

export default FieldOfResearch
