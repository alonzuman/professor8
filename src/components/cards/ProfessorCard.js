import React from 'react';
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Rating from '../general/Rating';

const ProfessorCard = ({ professor }) => {
  const { name, avatar, id, rating, school } = professor

  return (
    <Link to={`/professor/${id}`}>
      <ListItem dir='rtl' color='primary' button>
      <ListItemAvatar>
        <Avatar src={avatar} alt={name}>{name ? name[0] : ''}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={school} />
      <ListItemSecondaryAction>
        {rating > 0 && <Rating rating={rating} icon={'star'} />}
      </ListItemSecondaryAction>
    </ListItem>
    <Divider />
    </Link>
  )
}

export default ProfessorCard
