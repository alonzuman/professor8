import { Chip, Divider, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getProfessors } from '../../actions/professors'
import ProfessorCard from '../../components/cards/ProfessorCard'
import qs from 'query-string'
import './ProfessorsList.css'
import heb from '../../utils/translation/heb'
import { Skeleton } from '@material-ui/lab'
import NoResults from '../../pages/Results/components/NoResults'

const ProfessorsList = () => {
  const { professors, loading } = useSelector(state => state.professors)
  const filters = qs.parse(useHistory().location.search)
  const { schools, name } = filters;
  const dispatch = useDispatch()

  useEffect(() => {
    if (schools || (name && schools)) {
      dispatch(getProfessors())
    }
  }, [schools, name, dispatch])

  if (loading && professors.length === 0) {
    return (
      <div className='professors_list__container rtl'>
        <span className='flex align__center p-1 mb-2'>
          <Typography variant='body1'><Skeleton width={180} /></Typography>
        </span>
        <Paper className='pt-1 pb-1 pl-1 pr-1'>
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
        </Paper>
      </div>
    )
  } else if (!loading && !schools && !name) {
    return <div/>
  } else if (!loading && professors.length === 0) {
    return <NoResults msg={`${ heb.noResultsForYourSearchIn} "${schools}"`} />
  } else {
    return (
      <div className='professors_list__container rtl'>
        {schools &&
        <span className='flex align__center p-1 mb-2'>
          <Typography variant='body1'>
            {professors?.length === 1 && `${heb.foundOneResult}`}
            {professors?.length > 1 && `${heb.found} ${professors?.length} ${heb.results} ${heb.for}`}
          </Typography>
          <Chip className='results_school__chip' size='small' color='secondary' label={schools} />
        </span>}
        <Paper className='pt-1 pb-1 pl-1 pr-1'>
          {professors?.map((professor, index) => <ProfessorCard professor={professor} key={index} />)}
        </Paper>
      </div>
    )
  }
}

export default ProfessorsList
