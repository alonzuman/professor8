import { CircularProgress } from '@material-ui/core'
import React from 'react'
import ProfessorCard from '../components/cards/ProfessorCard'
import './ProfessorsList.css'

const ProfessorsList = ({ professors, loading }) => {
  if (loading) {
    return <CircularProgress />
  } else if (!loading && !professors) {
    return <h1>Empty</h1>
  } else {
    return (
      <div className='professors_list__container'>
        {professors?.map((professor, index) => <ProfessorCard professor={professor} key={index} />)}
      </div>
    )
  }
}

export default ProfessorsList
