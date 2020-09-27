import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import FiltersBar from '../components/general/FiltersBar'
import ProfessorsList from '../containers/lists/ProfessorsList'
import qs from 'query-string'
import SearchBar from '../components/general/SearchBar'
import heb from '../utils/translation/heb'
import { Button, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'

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
    <div>
      <form className='search_form__container' onSubmit={handleSubmit}>
        <SearchBar
          placeholder={heb.schoolName}
          collection='tags'
          doc='schools'
          filter='names'
          search={schools}
          setSearch={setSchools}
          freeSolo
        />
        <SearchBar
          placeholder={heb.professorName}
          collection='tags'
          doc='professors'
          filter={schools}
          search={name}
          setSearch={setName}
          freeSolo
        />
        <Button className='full__width-mobile mt-5' variant='contained' color='primary' type='submit'>{loading ? <CircularProgress className='spinner__small' color='default' /> : heb.search}</Button>
      </form>
      <ProfessorsList />
    </div>
  )
}

export default Results
