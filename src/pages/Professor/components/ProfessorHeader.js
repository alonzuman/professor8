import { Avatar, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'

const ProfessorHeader = ({ avatar, school, name, loading }) => {
  const avatarStyle = {
    height: 72,
    width: 72,
    marginLeft: '16px'
  }

  const titleStyle = {
    fontSize: 24,
    fontWeight: 600
  }

  return (
    <div className='page__section flex align__center'>
      {!loading ?
        avatar && <Avatar style={avatarStyle} src={avatar} alt={name}>{name?.split('')[0]}</Avatar> :
        <Skeleton style={avatarStyle} variant='circle' height={72} width={72} />}
      <div>
        <Typography style={titleStyle} variant='h4'>{name ? name : <Skeleton width={120} />}</Typography>
        <Typography variant='subtitle2'>{school ? school : <Skeleton width={150} />}</Typography>
      </div>
    </div>
  )
}

export default ProfessorHeader