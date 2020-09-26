import React, { useEffect, useState } from 'react'
import './FiltersBar.css'
import { Tab, Tabs } from '@material-ui/core'
import qs from 'query-string'
import { useHistory } from 'react-router-dom'
import SearchBar from './SearchBar'

const FiltersBar = () => {
  const history = useHistory();
  const [search, setSearch] = useState('')
  const tab = Object.keys(qs.parse(history.location.search))[0] || 'schools'

  useEffect(() => {
    if (!history.location.search) {
      handleTabChange({}, 'schools')
    } else {
      setSearch(Object.values(qs.parse(history.location.search))[0])
    }
  }, [])

  const handleTabChange = (e, newValue) => {
    const queryParams = {
      [newValue]: ''
    }

    setSearch('')
    history.push({
      pathname: '/search',
      search: qs.stringify(queryParams)
    })
  }

  const applySearch = (search) => {
    const query = {
      [tab]: search
    }

    history.push({
      pathname: '/search',
      search: qs.stringify(query)
    })
  }

  return (
    <div className='filters_bar__container'>
      <Tabs value={tab} onChange={handleTabChange}>
        <Tab label='Find by schools' value={'schools'} />
        <Tab label='Find by name' value={'name'} />
      </Tabs>
      <SearchBar
        placeholder='Find professors by schools name'
        handleSubmit={search => applySearch(search)}
        collection={tab === 'schools' ? 'schools' : 'professors'}
        search={search}
        setSearch={setSearch}
      />
    </div>
  )
}

export default FiltersBar
