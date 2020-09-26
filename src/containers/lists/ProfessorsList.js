import { Chip, CircularProgress, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getProfessors } from '../../actions/professors'
import ProfessorCard from '../../components/cards/ProfessorCard'
import qs from 'query-string'
import './ProfessorsList.css'
import { getSchool } from '../../actions/schools'
import SchoolContainer from '../dialogs/SchoolContainer'

const ProfessorsList = () => {
  const [schoolOpen, setSchoolOpen] = useState(false)
  const history = useHistory()
  const { professors, loading } = useSelector(state => state.professors)
  const filters = qs.parse(useHistory().location.search)
  const { schools, name } = filters;
  const dispatch = useDispatch()

  const handleSchoolClick = () => {
    // TODO set by url params
    dispatch(getSchool(schools))
    setSchoolOpen(true)
  }

  useEffect(() => {
    if (schools || name) {
      dispatch(getProfessors())
    }
  }, [schools, name])

  if (loading && professors.length === 0) {
    return <CircularProgress className='centered' />
  } else if (!loading && professors.length === 0) {
    return (
      <div>
        <h1>No results for {schools || name}</h1>
      </div>
    )
  } else {
    return (
      <div dir='rtl' className='professors_list__container'>
        <SchoolContainer open={schoolOpen} onClose={() => setSchoolOpen(false)} />
        {schools &&
        <Typography style={{ display: 'flex', alignItems: 'center', padding: 8 }} variant='body1'>
          נמצאו {professors?.length} תוצאות עבור <Chip style={{ margin: '0 8px' }} size='small' onClick={handleSchoolClick} label={schools} />
        </Typography>}
        {professors?.map((professor, index) => <ProfessorCard professor={professor} key={index} />)}
      </div>
    )
  }
}

export default ProfessorsList
