import { Chip, CircularProgress, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getProfessors } from '../../actions/professors'
import ProfessorCard from '../../components/cards/ProfessorCard'
import qs from 'query-string'
import './ProfessorsList.css'
import { getSchool } from '../../actions/schools'
import SchoolContainer from '../dialogs/SchoolContainer'
import heb from '../../utils/translation/heb'
import { Skeleton } from '@material-ui/lab'
import NoResults from '../../pages/Results/components/NoResults'

const ProfessorsList = () => {
  const [schoolOpen, setSchoolOpen] = useState(false)
  const { professors, loading } = useSelector(state => state.professors)
  const filters = qs.parse(useHistory().location.search)
  const { schools, name } = filters;
  const dispatch = useDispatch()

  const handleSchoolClick = () => {
    dispatch(getSchool(schools))
    setSchoolOpen(true)
  }

  useEffect(() => {
    if (schools || name) {
      dispatch(getProfessors())
    }
  }, [schools, name])

  const spanStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: 8
  }

  if (loading && professors.length === 0) {
    return (
      <div dir='rtl' className='professors_list__container'>
        <span style={spanStyle}>
          <Typography variant='body1'><Skeleton width={180} /></Typography>
        </span>
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
  } else if (!loading && !schools && !name) {
    return <div/>
  } else if (!loading && professors.length === 0) {
    return <NoResults msg={`${ heb.noResultsFor } "${name}" ${heb.in}${schools}`} />
  } else {
    return (
      <div dir='rtl' className='professors_list__container'>
        <SchoolContainer open={schoolOpen} onClose={() => setSchoolOpen(false)} />
        {schools &&
        <span style={spanStyle}>
          <Typography variant='body1'>
            {professors?.length === 1 && `${heb.foundOneResult}`}
            {professors?.length > 1 && `${heb.found} ${professors?.length} ${heb.results} ${heb.for}`}
          </Typography>
          <Chip className='results_school__chip' size='small' color='secondary' onClick={handleSchoolClick} label={schools} />
        </span>}
        {professors?.map((professor, index) => <ProfessorCard professor={professor} key={index} />)}
      </div>
    )
  }
}

export default ProfessorsList
