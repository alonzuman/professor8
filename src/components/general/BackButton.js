import { IconButton } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const BackButton = ({ variant, sticky = false }) => {
  const history = useHistory()

  const buttonStyle = {
    boxShadow: variant === 'contained' ? '0px 0px 10px #00000015' : '',
    position: sticky ? 'sticky' : 'relative',
    top: sticky ? '16px' : '',
    zIndex: 9,
    backgroundColor: 'var(--bg-00)'
  }

  return <IconButton style={buttonStyle} onClick={() => history.goBack()}><KeyboardArrowRightIcon /></IconButton>
}

export default BackButton
