import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ProfessorsList from '../../containers/lists/ProfessorsList'
import qs from 'query-string'
import { useDispatch, useSelector } from 'react-redux'
import ResultsSearchBar from './components/ResultsSearchBar'
import { validateStringInput } from '../../utils/form'
import { getProfessors, loadMoreProfessors } from '../../actions/professors'
import useWindowSize from '../../hooks/useWindowSize'

const Results = () => {
  const filters = qs.parse(useHistory().location.search)
  const { schools, name } = filters;
  const { loading, professors, lastProfessorId } = useSelector(state => state.professors)
  const stateFilters = useSelector(state => state.professors.filters)
  const dispatch = useDispatch()
  const lastProfessor = professors[professors?.length - 1]?.id
  const { windowWidth } = useWindowSize()

  useEffect(() => {
    if (schools || (name && schools)) {
      if ((filters?.name !== stateFilters?.name) || (filters?.schools !== stateFilters?.schools)){
        dispatch(getProfessors())
      }
    }
  }, [schools, name, dispatch])

  const loadMore = () => {
    const last = professors[professors?.length - 1]
    dispatch(loadMoreProfessors({ last }))
  }

  return (
    <div className='flex full__height align__center flex__column p-2'>
      {windowWidth <= 768 && <ResultsSearchBar customClassName='mobile_results_search_bar' />}
      <ProfessorsList
        loading={loading}
        professors={professors}
        name={name}
        schools={schools}
        loadMore={loadMore}
        noMoreResults={lastProfessorId === lastProfessor}
      />
    </div>
  )
}

export default Results
