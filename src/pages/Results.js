import React from 'react'
import DbControls from '../components/admin/DbControls'
import FiltersBar from '../components/general/FiltersBar'
import ProfessorsList from '../containers/lists/ProfessorsList'

const Results = () => {
  return (
    <div>
      <FiltersBar />
      <ProfessorsList />
    </div>
  )
}

export default Results
