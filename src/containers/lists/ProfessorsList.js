import { CircularProgress } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfessor, getProfessors } from '../../actions/professors'
import ProfessorCard from '../../components/cards/ProfessorCard'
import './ProfessorsList.css'

const ProfessorsList = () => {
  const { filters, professors, loading } = useSelector(state => state.professors)
  const { institution, name } = filters;
  const dispatch = useDispatch()
  useEffect(() => { dispatch(getProfessors()) }, [filters])

  if (loading && professors.length === 0) {
    return <CircularProgress className='centered' />
  } else if (!loading && professors.length === 0) {
    return (
      <div>
        {institution && <h1>No results for {institution}</h1>}
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
