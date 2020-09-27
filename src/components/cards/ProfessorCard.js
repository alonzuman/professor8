import React, { useState } from 'react';
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import ProfessorContainer from '../../containers/dialogs/ProfessorContainer';

const ProfessorCard = ({ professor }) => {
  const [open, setOpen] = useState(false)
  const { name, tags, lastReview, avatar, id, departure, university, reviews, role, overallRating } = professor

  return (
    <>
    <ProfessorContainer open={open} onClose={() => setOpen(false)} id={id} />
    <ListItem dir='rtl' onClick={() => setOpen(true)} button>
      <ListItemAvatar>
        <Avatar src={avatar} alt={name}>{name[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={role} />
    </ListItem>
    <Divider />
    </>
  )
}

export default ProfessorCard
