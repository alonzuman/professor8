import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ProfessorsList from '../../containers/lists/ProfessorsList'
import qs from 'query-string'
import SearchBar from '../../components/general/SearchBar'
import heb from '../../utils/translation/heb'
import { Button, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import ResultsSearchBar from './components/ResultsSearchBar'

const Results = () => {
  const { loading } = useSelector(state => state.professors)
  const [schools, setSchools] = useState('')
  const [name, setName] = useState('')
  const history = useHistory()

  useEffect(() => {
    const query = history.location.search;
    const parsedQuery = qs.parse(query)

    setSchools(parsedQuery.schools)
    setName(parsedQuery.name)
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    const query = {
      schools,
      name
    }
    const stringifiedQuery = qs.stringify(query)

    history.push({
      pathname: '/search',
      search: stringifiedQuery
    })
  }

  return (
    <div className='flex full__height align__center flex__column'>
      <ResultsSearchBar
        loading={loading}
        schools={schools}
        setSchools={setSchools}
        name={name}
        setName={setName}
        handleSubmit={handleSubmit}
      />
      <ProfessorsList />
    </div>
  )
}

export default Results
