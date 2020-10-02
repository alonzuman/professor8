import React from 'react';
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import heb from '../../utils/translation/heb';
import Rating from '../general/Rating';
import { useDispatch } from 'react-redux';

const ProfessorCard = ({ professor }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { name, avatar, id, overallRating, school } = professor

  const handleClick = () => {
    dispatch({
      type: 'PROFESSORS/CLEAR_PROFESSOR'
    })
    history.push({
      pathname: `/professor/${id}`,
    })
  }

  return (
    <>
    <ListItem dir='rtl' onClick={handleClick} button>
      <ListItemAvatar>
        <Avatar src={avatar} alt={name}>{name ? name[0] : ''}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={school} />
      <ListItemSecondaryAction>
        {overallRating > 0 && <Rating rating={overallRating} icon={'star'} />}
      </ListItemSecondaryAction>
    </ListItem>
    <Divider />
    </>
  )
}

export default ProfessorCard
