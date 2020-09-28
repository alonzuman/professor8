import { Button, Chip, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React, { useState } from 'react'
import heb from '../../../utils/translation/heb'

const FieldOfResearch = ({ fieldOfResearch, loading }) => {
  const [show, setShow] = useState(false)

  return (
    <div className='page__section'>
      <Typography variant='subtitle1'>
        {!loading ?
          fieldOfResearch?.length > 0 ? heb.fieldOfResearch : '' :
          <Skeleton className='mb-1' width={120} />}
        </Typography>
      <div>
        {loading && [0, 0, 0, 0].map((v, i) => <Chip className='ml-1 mb-1' size='small' key={i} style={{ width: 120 }} />)}
        {!loading && fieldOfResearch?.map((v, i) => {
          if (!show) {
            if (i <= 2) return <Chip className='ml-1 mb-1' size='small' variant='outlined' key={i} label={v} />
          } else {
            return <Chip className='ml-1 mb-1' size='small' variant='outlined' key={i} label={v} />
          }}
        )}
      </div>
      {fieldOfResearch && <Button className='small__btn' color='primary' onClick={() => setShow(!show)}>{loading ? <Skeleton width={80} /> : show ? heb.hide : heb.showAll}</Button>}
      {loading && <Button className='small__btn' color='primary'><Skeleton width={80} /></Button>}
    </div>
  )
}

export default FieldOfResearch
