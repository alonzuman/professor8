import React, { useState } from 'react';
import { Divider, ListItem, ListItemText } from '@material-ui/core';
import ProfessorContainer from '../../containers/dialogs/ProfessorContainer';

const ProfessorCard = ({ professor }) => {
  const [open, setOpen] = useState(false)
  const { name, tags, lastReview, id, departure, university, reviews, role, overallRating } = professor

  return (
    <>
    <ProfessorContainer open={open} onClose={() => setOpen(false)} id={id} />
    <ListItem onClick={() => setOpen(true)} button>
      <ListItemText primary={name} secondary={role} />
    </ListItem>
    <Divider />
    </>
  )
}

export default ProfessorCard
