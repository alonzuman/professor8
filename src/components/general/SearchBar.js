import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, OutlinedInput, TextField } from '@material-ui/core'
import { db } from '../../firebase'
import './SearchBar.css'
import { Autocomplete } from '@material-ui/lab'
import heb from '../../utils/translation/heb'

const SearchBar = ({ size = 'small', search, setSearch, collection, doc, filter, placeholder, noOptionsText = `${heb.noResults}`, style, className, ...rest }) => {
  const [options, setOptions] = useState([])

  const getFilterOptions = async () => {
    try {
      const snapshot = await db.collection(collection).doc(doc).get()
      if (filter === 'keys') {
        setOptions(Object.keys(snapshot.data()) || [])
      } else {
        setOptions(snapshot.data()[filter] || [])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { getFilterOptions() }, [filter])

  return (
    <div style={style} className={`search_bar__container ${className}`}>
      <Autocomplete
        dir='rtl'
        style={{ width: '100%', direction: 'rtl' }}
        handleHomeEndKeys
        autoHighlight
        noOptionsText={noOptionsText}
        value={search}
        size={size}
        onChange={(event, newValue) => setSearch(newValue)}
        options={options?.map(v => v)}
        renderInput={(params) => <AutoCompleteInput size={size} label={placeholder} variant="outlined" {...params} />}
        renderOption={option => <div style={{ textAlign: 'right', width: '100%' }} >{option}</div>}
        {...rest}
      />
    </div>
  )
}

const AutoCompleteInput = ({ size, label, variant, ...params }) => {
  return <TextField size={size} label={label} variant={variant} {...params} />
}

export default SearchBar
