import React from 'react';
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Rating from '../general/Rating';

const ProfessorCard = ({ professor }) => {
  const { name, avatar, id, overallRating, school } = professor

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'none'
  }

  return (
    <Link style={linkStyle} to={`/professor/${id}`}>
      <ListItem dir='rtl' color='primary' button>
      <ListItemAvatar>
        <Avatar src={avatar} alt={name}>{name ? name[0] : ''}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={school} />
      <ListItemSecondaryAction>
        {overallRating > 0 && <Rating rating={overallRating} icon={'star'} />}
      </ListItemSecondaryAction>
    </ListItem>
    <Divider />
    </Link>
  )
}

export default ProfessorCard
