import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { db } from '../../firebase'
import './SearchBar.css'
import { Autocomplete } from '@material-ui/lab'
import { getFilterOptions } from '../../actions/professors'
import { useDispatch, useSelector } from 'react-redux'
import heb from '../../utils/translation/heb'

const SearchBar = ({  search, setSearch, handleSubmit, collection, placeholder, noOptionsText = 'No results found' }) => {
  const { filterOptions, loading } = useSelector(state => state.professors)
  const dispatch = useDispatch()

  useEffect(() => { dispatch(getFilterOptions(collection)) }, [collection])

  const submitSearch = e => {
    e.preventDefault()
    handleSubmit(search)
  }

  return (
    <form onSubmit={submitSearch} className='search_bar__container'>
      <Autocomplete
        dir='rtl'
        style={{ width: '100%', direction: 'rtl' }}
        handleHomeEndKeys
        autoHighlight
        autoSelect
        noOptionsText={noOptionsText}
        value={search}
        onChange={(event, newValue) => setSearch(newValue)}
        options={filterOptions?.map(v => v.name)}
        renderInput={(params) => <TextField {...params} label={placeholder} variant="outlined" />}
        renderOption={option => <div style={{ textAlign: 'right', width: '100%' }} >{option}</div>}
      />
      <Button style={{ marginRight: '8px' }} variant='contained' color='primary' type='submit'>{heb.search}</Button>
    </form>
  )
}

export default SearchBar
