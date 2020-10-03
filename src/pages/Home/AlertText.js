import React from 'react'
import { useDispatch } from 'react-redux'
import { setAlert } from '../../actions/alerts'

const AlertText = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    console.log('clicked')
    dispatch(setAlert({
      type: 'success',
      msg: 'TESTING'
    }))
  }

  return (
    <button onClick={handleClick}>Alert</button>
  )
}

export default AlertText
