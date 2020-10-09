import { Card, CardHeader } from '@material-ui/core'
import React from 'react'
import { numberOfProfessors } from '../../../../../utils/professor'
import './SavedListCard.css'

const SavedListCard = ({ length, name }) => {
  return (
    <Card>
      <CardHeader title={name} subheader={numberOfProfessors({ num: length })} />
    </Card>
  )
}

export default SavedListCard
