import React from 'react'
import { useDispatch } from 'react-redux'
import { setAlert } from '../../actions/alerts'

const AlertText = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setAlert({
      severity: 'success',
      msg: 'TESTING'
    }))
  }

  return (
    <button onClick={handleClick}>Alert</button>
  )
}

export default AlertText
