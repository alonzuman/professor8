import { Divider, Grid, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom'
import ProfessorCard from '../../../../components/cards/ProfessorCard'
import PageHeader from '../../../../components/layout/PageHeader'
import SavedListDialog from '../../../../containers/dialogs/SavedListDialog'
import heb from '../../../../utils/translation/heb'
import NoResults from '../../../Results/components/NoResults'
import SavedListCard from './components/SavedListCard'
import './SavedProfessors.css'

const SavedProfessors = ({ match }) => {
  const { loading, lists } = useSelector(state => state.saved)
  const { name } = match.params
  const history = useHistory()
  const open = Boolean(name)
  const list = lists[name]

  const handleClose = () => {
    return history.push({
      pathname: '/saved'
    })
  }

  if (loading) {
    return (
      <div dir='rtl'>
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
    <div className='saved_professors__container rtl'>
      <SavedListDialog list={list} name={name} open={open} onClose={handleClose} />
      <PageHeader divider title={heb.savedProfessors} />
      <Grid container spacing={2}>
        {Object.keys(lists).length === 0 && !loading && <NoResults msg={heb.noListsFound} centered />}
        {Object.keys(lists)?.map((v, i) => {
          return (
            <Grid item xs={6} md={4} lg={4}>
              <Link key={i} to={`/saved/${v}`}>
                <SavedListCard name={v} />
              </Link>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default SavedProfessors
