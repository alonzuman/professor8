import { CircularProgress } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getProfessors } from '../../actions/professors'
import ProfessorCard from '../../components/cards/ProfessorCard'
import qs from 'query-string'
import './ProfessorsList.css'

const ProfessorsList = () => {
  const { professors, loading } = useSelector(state => state.professors)
  const filters = qs.parse(useHistory().location.search)
  const { schools, name } = filters;
  const dispatch = useDispatch()

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
        {schools && <h1>No results for {schools}</h1>}
        {name && <h1>No results for {name}</h1>}
      </div>
    )
  } else {
    return (
      <div className='professors_list__container'>
        {professors?.map((professor, index) => <ProfessorCard professor={professor} key={index} />)}
      </div>
    )
  }
}

export default ProfessorsList
