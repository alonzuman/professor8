import { Button } from '@material-ui/core'
import React from 'react'
import heb from '../../../utils/translation/heb'
import './ProfessorFooter.css'

const ProfessorFooter = () => {
  return (
    <div className='professor_footer__container mobile__show'>
      <Button color='primary' className='full__width' variant='contained'>{heb.addReview}</Button>
    </div>
  )
}

export default ProfessorFooter
