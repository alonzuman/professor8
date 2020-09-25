import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '../../actions/professors'
import SearchBar from '../../components/general/SearchBar'
import ProfessorsList from '../ProfessorsList'

const SearchBySchool = () => {
  const { loading, professors } = useSelector(state => state.professors)
  const dispatch = useDispatch()
  const applySearch = (search) => { dispatch(setFilters({ institution: search })) }

  return (
    <>
      <SearchBar handleSubmit={search => applySearch(search)} collection='institutions' />
      <ProfessorsList professors={professors} loading={loading} />
    </>
  )
}

export default SearchBySchool
