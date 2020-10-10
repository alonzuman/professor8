import { IconButton } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const BackButton = ({ className }) => {
  const history = useHistory()

  const handleClick = () => {
    history.goBack()
  }

  return <IconButton className={`${className} bg-01`} onClick={handleClick}><KeyboardArrowRightIcon /></IconButton>
}

export default BackButton
