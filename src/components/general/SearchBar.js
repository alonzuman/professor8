import React, { useEffect, useState } from 'react'
import { TextField } from '@material-ui/core'
import AutoComplete from './AutoComplete'
import { db } from '../../firebase'
import './SearchBar.css'

const SearchBar = ({ handleSubmit, collection }) => {
  const [search, setSearch] = useState('')
  const [options, setOptions] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [show, setShow] = useState(false)

  const handleFormSubmit = e => {
    e.preventDefault()
    handleSubmit(search)
  }

  const handleSuggestionClick = suggestion => {
    setSearch(suggestion);
    handleSubmit(suggestion);
  }

  const fetchSuggestions = async () => {
    try {
      const snapshot = await db.collection(collection).get()
      let results = []
      snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))
      setOptions(results)
      console.log(results)
    } catch (error) {
      console.log(error)
    }
  }

  const filterSuggestions = () => {
    const searchArr = search.split('')
    setSuggestions(options?.filter(({ name }) => {
      if (name.split('').slice(0, searchArr.length).join('') === searchArr.join('') && name !== search) {
        return name
      }
    }))
  }

  useEffect(() => { fetchSuggestions() }, [])
  useEffect(() => { filterSuggestions() }, [search])

  const handleSearchChange = e => {
    setShow(true)
    setSearch(e.target.value)
  }

  return (
    <form onSubmit={handleFormSubmit} className='search_bar__container'>
      <TextField placeholder='Find professors by school name' onClick={() => setShow(true)} className='search_bar__input' variant='outlined' value={search} onChange={handleSearchChange} />
      <AutoComplete setShow={setShow} show={show} search={search} onClick={suggestion => handleSuggestionClick(suggestion)} suggestions={suggestions} />
    </form>
  )
}

export default SearchBar
