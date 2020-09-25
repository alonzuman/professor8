import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilters } from '../../actions/professors'
import SearchBar from '../../components/general/SearchBar'
import ProfessorsList from '../lists/ProfessorsList'

const SearchBySchool = () => {
  const dispatch = useDispatch()
  const applySearch = (search) => { dispatch(setFilters({ institution: search })) }

  return (
    <div style={{ width: '100%', margin: '16px 0' }}>
      <SearchBar placeholder='Find professors by school name' handleSubmit={search => applySearch(search)} collection='institutions' />
      <ProfessorsList />
    </div>
  )
}

export default SearchBySchool
