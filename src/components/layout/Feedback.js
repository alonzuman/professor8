import React from 'react'
import { Alert } from '@material-ui/lab'
import './Feedback.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearFeedback } from '../../actions'

const Feedback = () => {
  const { msg, severity } = useSelector(state => state.feedback)
  const dispatch = useDispatch()

  const handleClick = () => dispatch(clearFeedback())

  if (Boolean(msg)) {
    return (
      <div onClick={handleClick} className='alert__container rtl'>
        <Alert severity={severity}>{msg}</Alert>
      </div>
    )
  } else {
    return null
  }
}

export default Feedback
