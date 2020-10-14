import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ProfessorsList from '../../containers/lists/ProfessorsList'
import qs from 'query-string'
import { useDispatch, useSelector } from 'react-redux'
import ResultsSearchBar from './components/ResultsSearchBar'
import { validateStringInput } from '../../utils/form'
import { getProfessors, loadMoreProfessors } from '../../actions/professors'

const Results = () => {
  const filters = qs.parse(useHistory().location.search)
  const { loading, professors, lastProfessorId } = useSelector(state => state.professors)
  const { schools, name } = filters;
  const [schoolsQuery, setSchoolsQuery] = useState('')
  const [nameQuery, setNameQuery] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()
  const lastProfessor = professors[professors?.length - 1]?.id

  useEffect(() => {
    const query = history.location.search;
    const parsedQuery = qs.parse(query)

    setSchoolsQuery(parsedQuery.schools)
    setNameQuery(parsedQuery.name)
  }, [])

  const handleSubmit = e => {
    e.preventDefault();

    if (validateStringInput(schools)) {
      const query = {
        schools: schoolsQuery,
        name: nameQuery
      }
      const stringifiedQuery = qs.stringify(query)

      history.push({
        pathname: '/search',
        search: stringifiedQuery
      })
    }
  }

  useEffect(() => {
    if (schools || (name && schools)) {
      dispatch(getProfessors())
    }
  }, [schools, name, dispatch])

  const loadMore = () => {
    const last = professors[professors?.length - 1]
    dispatch(loadMoreProfessors({ last }))
  }

  return (
    <div className='flex full__height align__center flex__column p-2'>
      <ResultsSearchBar
        loading={loading}
        schools={schoolsQuery}
        setSchools={setSchoolsQuery}
        name={nameQuery}
        setName={setNameQuery}
        handleSubmit={handleSubmit}
      />
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
