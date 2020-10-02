import { Typography } from '@material-ui/core'
import React from 'react'
import './SchoolCard.css'

const SchoolCard = ({ school }) => {
  const { name, icon: Icon } = school

  return (
    <div className='school_card__wrapper'>
      <div className='school_card__container'>
        <Typography variant='h5'>{name}</Typography>
        <Icon />
      </div>
    </div>
  )
}

export default SchoolCard
