import { IconButton, Typography } from '@material-ui/core'
import React from 'react'
import './PageHeader.css'
import BackButton from '../general/BackButton';

const PageHeader = ({ title, backButton, sticky }) => {
  const containerStyle = {
    position: sticky ? 'sticky' : 'relative',
    top: sticky ? '0' : ''
  }

  return (
    <div style={containerStyle} className='page_header__container'>
      {backButton && <BackButton variant='contained mb-2' />}
      <Typography className='page_header__title' variant='h1'>{title}</Typography>
    </div>
  )
}

export default PageHeader
