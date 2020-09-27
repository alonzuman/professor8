import React, { useState } from 'react';
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import heb from '../../utils/translation/heb';

const ProfessorCard = ({ professor }) => {
  const [open, setOpen] = useState(false)
  const history = useHistory()
  const { name, tags, lastReview, avatar, id, departure, numberOfReviews, university, reviews, role, overallRating } = professor

  const handleClick = () => {
    history.push({
      pathname: `/professor/${id}`,
    })
  }

  const ratingStyle = {
    fontSize: 22,
    fontWeight: 600,
    letterSpacing: 1,
    direction: 'ltr'
  }

  return (
    <>
    <ListItem dir='rtl' onClick={handleClick} button>
      <ListItemAvatar>
        <Avatar src={avatar} alt={name}>{name[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={`${numberOfReviews === 1 ? heb.oneReview : `${numberOfReviews} ${heb.reviews}`}`} />
      <ListItemSecondaryAction>
        {overallRating > 0 && <Typography style={ratingStyle} variant='body1'>{(overallRating % 1 === 0) ? overallRating : overallRating.toFixed(1)}/5</Typography>}
      </ListItemSecondaryAction>
    </ListItem>
    <Divider />
    </>
  )
}

export default ProfessorCard
