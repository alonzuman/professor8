import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilters } from '../../actions/professors'
import SearchBar from '../../components/general/SearchBar'
import ProfessorsList from '../lists/ProfessorsList'

const SearchByProfessor = () => {
  const dispatch = useDispatch()
  const applySearch = (search) => { dispatch(setFilters({ name: search })) }

  return (
    <div style={{ width: '100%', margin: '16px 0' }}>
      <SearchBar noOptionsText='No Results' placeholder='Search by professor name' handleSubmit={search => applySearch(search)} collection='professors' />
      <ProfessorsList />
    </div>
  )
}

export default SearchByProfessor
