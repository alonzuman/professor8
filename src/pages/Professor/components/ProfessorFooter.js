import { Button } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import heb from '../../../utils/translation/heb'
import './ProfessorFooter.css'

const ProfessorFooter = ({ onClick, loading }) => {
  return (
    <div className='professor_footer__container mobile__show bg-01'>
      {loading && <Skeleton height={42} width={'100%'} />}
      {!loading && <Button size='large' onClick={onClick} color='primary' className='full__width' variant='contained'>{heb.addReview}</Button>}
    </div>
  )
}

export default ProfessorFooter
