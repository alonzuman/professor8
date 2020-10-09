import React from 'react';
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Rating from '../general/Rating';
import { professorCardSubtitle } from '../../utils/professor';

const ProfessorCard = ({ professor }) => {
  const { name, avatar, id, rating, reviewsCount, school } = professor

  return (
    <Link to={`/professor/${id}`}>
      <ListItem className='rtl' color='primary' button>
      <ListItemAvatar>
        <Avatar src={avatar} alt={name}>{name ? name[0] : ''}</Avatar>
      </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={<span className='rtl'>{professorCardSubtitle({num: reviewsCount, school })}</span>}
        />
      <ListItemSecondaryAction>
        {rating > 0 && <Rating rating={rating} icon={'star'} />}
      </ListItemSecondaryAction>
    </ListItem>
    <Divider />
    </Link>
  )
}

export default ProfessorCard
