import React from 'react'
import { useDispatch } from 'react-redux'
import { setFeedback } from '../../actions'

const AlertText = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setFeedback({
      severity: 'success',
      msg: 'TESTING'
    }))
  }

  return (
    <button onClick={handleClick}>Alert</button>
  )
}

export default AlertText
