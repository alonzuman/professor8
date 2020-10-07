import React, { useEffect, useState } from 'react'
import { TextField } from '@material-ui/core'
import './SearchBar.css'
import { Autocomplete } from '@material-ui/lab'
import heb from '../../utils/translation/heb'
import { useSelector } from 'react-redux'
import { createFilterOptions } from '@material-ui/lab/Autocomplete';

const SearchBar = ({ size = 'small', search, setSearch, collection, doc, filter, placeholder, noOptionsText = `${heb.noResults}`, style, className, ...rest }) => {
  const allTags = useSelector(state => state.tags)
  const [options, setOptions] = useState([])

  const mapTagsToArray = () => {
    if (filter === 'keys') {
      setOptions(Object.keys(allTags[doc]) || [])
    } else {
      setOptions(allTags[doc][filter] || [])
    }
  }

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option,
    limit: 30
  });

  useEffect(() => {if (allTags && allTags[doc]) return mapTagsToArray()}, [allTags, filter, doc])

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
        filterOptions={filterOptions}
        onChange={(event, newValue) => setSearch(newValue)}
        options={options?.map(v => v)}
        renderInput={(params) => <AutoCompleteInput size={size} label={placeholder} variant="outlined" {...params} />}
        renderOption={option => <div className='autocomplete__option'>{option}</div>}
        {...rest}
      />
    </div>
  )
}

const AutoCompleteInput = ({ size, label, variant, ...params }) => {
  return <TextField size={size} label={label} variant={variant} {...params} />
}

export default SearchBar
