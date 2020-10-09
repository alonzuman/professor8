import { Card, CardHeader, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PageHeader from '../../../../components/layout/PageHeader'
import heb from '../../../../utils/translation/heb'
import NoResults from '../../../Results/components/NoResults'
import SavedListCard from './components/SavedListCard'
import './SavedLists.css'

const SavedProfessors = () => {
  const { uid } = useSelector(state => state.auth)
  const { loading, lists } = useSelector(state => state.saved)

  if (loading) {
    return (
      <div className='saved_professors__container rtl'>
        <PageHeader divider title={<Skeleton width={96} />} />
        <Grid container spacing={2}>
          {[0, 0, 0].map((v, i) => {
            return (
              <Grid item key={i}>
                <Card>
                  <CardHeader title={<Skeleton width={120} />} subheader={<Skeleton width={48} />} />
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }
  return (
    <div className='saved_professors__container rtl'>
      <PageHeader
        divider
        title={heb.savedProfessors}
      />
      <Grid container spacing={2}>
        {lists.length === 0 && !loading && <NoResults msg={heb.noListsFound} centered />}
        {lists?.map((v, i) => {
          return (
            <Grid key={i} item xs={6} md={4} lg={4}>
              <Link to={`/saved-lists/${uid}/${v.id}`}>
                <SavedListCard length={v?.professorIds?.length} name={v.name} />
              </Link>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default SavedProfessors
