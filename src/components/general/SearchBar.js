import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { db } from '../../firebase'
import './SearchBar.css'
import { Autocomplete } from '@material-ui/lab'

const SearchBar = ({  search, setSearch, handleSubmit, collection, placeholder, noOptionsText = 'No results found' }) => {
  const [options, setOptions] = useState([])

  const fetchSuggestions = async () => {
    try {
      const snapshot = await db.collection(collection).get()
      let results = []
      snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))
      setOptions(results)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { fetchSuggestions() }, [collection])

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
        options={options.map(v => v.name)}
        renderInput={(params) => <TextField {...params} label={placeholder} variant="outlined" />}
        renderOption={option => <div style={{ textAlign: 'right', width: '100%' }} >{option}</div>}
      />
      <Button style={{ marginRight: '8px' }} variant='contained' color='primary' type='submit'>Search</Button>
    </form>
  )
}

export default SearchBar
