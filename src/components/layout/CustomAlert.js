import React from 'react'
import { Alert } from '@material-ui/lab'
import './CustomAlert.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearAlert } from '../../actions/alerts'

const CustomAlert = () => {
  const { msg, type } = useSelector(state => state.alerts)
  const dispatch = useDispatch()

  const handleClick = () => dispatch(clearAlert())

  if (Boolean(msg)) {
    return (
      <div onClick={handleClick} className='alert__container rtl'>
        <Alert severity={type}>{msg}</Alert>
      </div>
    )
  } else {
    return null
  }
}

export default CustomAlert
