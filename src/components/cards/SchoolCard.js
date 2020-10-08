import { Paper, Typography } from '@material-ui/core'
import React from 'react'
import './SchoolCard.css'

const SchoolCard = ({ school }) => {
  const { name, icon: Icon } = school

  return (
    <div className='school_card__wrapper'>
      <Paper className='school_card__container'>
        <Typography variant='h5'>{name}</Typography>
        {/* <Icon /> */}
      </Paper>
    </div>
  )
}

export default SchoolCard
