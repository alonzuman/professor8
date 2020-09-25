import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import './HomeSearchBarContainer.css';

const HomeSearchBarContainer = () => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const handleChange = e => {
    // Dispatch get suggestions
    setValue(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(value)
  }

  const searchBarStyle = {
    width: '100%'
  }

  return (
    <div className='home_search_bar__container'>
      <form onSubmit={handleSubmit}>
        <SearchBar style={searchBarStyle} value={value} onChange={handleChange} suggestions={suggestions} />
        <Button type='submit'>Search</Button>
      </form>
    </div>
  )
}

export default HomeSearchBarContainer
