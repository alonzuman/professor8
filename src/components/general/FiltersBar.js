import React, { useState } from 'react'
import './FiltersBar.css'
import { Tab, Tabs } from '@material-ui/core'
import SearchByProfessor from '../../containers/search/SearchByProfessor'
import SearchBySchool from '../../containers/search/SearchBySchool'
import qs from 'query-string'

const FiltersBar = () => {
  const [tabValue, setTabValue] = useState(0)
  const handleTabChange = (e, newValue) => setTabValue(newValue)

  return (
    <div className='filters_bar__container'>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label='Find by school' value={0} />
        <Tab label='Find by name' value={1} />
      </Tabs>
      {tabValue === 0 && <SearchBySchool />}
      {tabValue === 1 && <SearchByProfessor />}
    </div>
  )
}

export default FiltersBar
