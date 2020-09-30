import React, { useState } from 'react';
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import heb from '../../utils/translation/heb';
import Rating from '../general/Rating';
import { useDispatch } from 'react-redux';

const ProfessorCard = ({ professor }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { name, avatar, id, numberOfReviews, university, reviews, role, overallRating } = professor

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
      <ListItemText primary={name} secondary={`${numberOfReviews === 1 ? heb.oneReview : `${numberOfReviews ? numberOfReviews : 0} ${heb.reviews}`}`} />
      <ListItemSecondaryAction>
        {overallRating > 0 && <Rating rating={overallRating} icon={'star'} />}
      </ListItemSecondaryAction>
    </ListItem>
    <Divider />
    </>
  )
}

export default ProfessorCard
