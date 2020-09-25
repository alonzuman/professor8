import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { db } from '../../firebase'
import './SearchBar.css'
import { Autocomplete } from '@material-ui/lab'

const SearchBar = ({ handleSubmit, collection, placeholder, noOptionsText = 'No results found' }) => {
  const [search, setSearch] = useState('')
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

  useEffect(() => { fetchSuggestions() }, [])

  const submitSearch = e => {
    e.preventDefault()
    handleSubmit(search)
  }

  return (
    <form onSubmit={submitSearch} className='search_bar__container'>
      <Autocomplete
        style={{ width: '100%', direction: 'rtl' }}
        handleHomeEndKeys
        autoHighlight
        autoSelect
        noOptionsText={noOptionsText}
        value={search}
        onChange={(event, newValue) => setSearch(newValue)}
        options={options.map(v => v.name)}
        renderInput={(params) => <TextField {...params} label={placeholder} variant="outlined" />}
      />
      <Button variant='contained' color='primary' type='submit'>Search</Button>
    </form>
  )
}

export default SearchBar
