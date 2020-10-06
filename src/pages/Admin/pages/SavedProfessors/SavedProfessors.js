import { Divider, Grid, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfessorCard from '../../../../components/cards/ProfessorCard'

const SavedProfessors = () => {
  const { savedProfessors, loading } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: 'PROFESSORS/SET_ALL',
      payload: savedProfessors
    })
  }, [savedProfessors])


  if (loading) {
    return (
      <div>
        {[0, 0, 0].map((v, i) => {
          return (
            <div key={i}>
              <ListItem>
                <ListItemAvatar>
                  <Skeleton variant='circle' height={40} width={40} />
                </ListItemAvatar>
                <ListItemText primary={<Skeleton width={120} />} secondary={<Skeleton width={160} />} />
              </ListItem>
              <Divider />
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <Grid container spacing={2}>
      {savedProfessors?.map((v, i) => <Grid key={i} item xs={12} md={4} lg={4}><ProfessorCard professor={v} /></Grid>)}
    </Grid>
  )
}

export default SavedProfessors
