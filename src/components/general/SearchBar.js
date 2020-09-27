import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { db } from '../../firebase'
import './SearchBar.css'
import { Autocomplete } from '@material-ui/lab'
import heb from '../../utils/translation/heb'

const SearchBar = ({  search, filter, setSearch, collection, placeholder, noOptionsText = 'No results found', ...rest }) => {
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState([])

  const getFilterOptions = async () => {
    setLoading(true)
    try {
      let snapshot;
      if (filter) {
        snapshot = await db.collection(collection).where(filter.key, '==', filter.value).get()
      } else {
        snapshot = await db.collection(collection).get()
      }
      let results = []
      snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))
      setOptions(results)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => { getFilterOptions() }, [filter])

  return (
    <div className='search_bar__container'>
      <Autocomplete
        dir='rtl'
        style={{ width: '100%', direction: 'rtl' }}
        handleHomeEndKeys
        autoHighlight
        autoSelect
        noOptionsText={noOptionsText}
        value={search}
        onChange={(event, newValue) => setSearch(newValue)}
        options={options?.map(v => v.name)}
        renderInput={(params) => <TextField {...params} label={placeholder} variant="outlined" />}
        renderOption={option => <div style={{ textAlign: 'right', width: '100%' }} >{option}</div>}
        {...rest}
      />
    </div>
  )
}

export default SearchBar
