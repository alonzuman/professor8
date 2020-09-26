import React, { useEffect, useState } from 'react'
import './FiltersBar.css'
import { Tab, Tabs } from '@material-ui/core'
import qs from 'query-string'
import { useHistory } from 'react-router-dom'
import SearchBar from './SearchBar'
import heb from '../../utils/translation/heb'

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
        <Tab label={heb.findBySchool} value={'schools'} />
        <Tab label={heb.findByProfessor} value={'name'} />
      </Tabs>
      <SearchBar
        placeholder={tab === 'schools' ? heb.findProfessorBySchool : heb.findProfessorByName}
        handleSubmit={search => applySearch(search)}
        collection={tab === 'schools' ? 'schools' : 'professors'}
        search={search}
        setSearch={setSearch}
      />
    </div>
  )
}

export default FiltersBar
