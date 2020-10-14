import { Button, CircularProgress, IconButton, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import SearchBar from '../../../components/general/SearchBar'
import heb from '../../../utils/translation/heb'
import SearchIcon from '@material-ui/icons/Search';
import './ResultsSearchBar.css';

const ResultsSearchBar = ({ loading, handleSubmit, schools, setSchools, name, setName }) => {
  const iconStyle = {
    color: '#fff'
  }

  return (
    <Paper className='results_search_bar__wrapper'>
      <form className='rtl results_search_bar__container' onSubmit={handleSubmit}>
        <SearchBar
          placeholder={heb.schoolName}
          doc='professors'
          filter='keys'
          search={schools}
          setSearch={setSchools}
          freeSolo
          className='ml-5 mt-0'
        />
        <SearchBar
          placeholder={heb.professorName}
          doc='professors'
          filter={schools}
          search={name}
          setSearch={setName}
          freeSolo
          className='mr-5 ml-1 mt-0'
        />
        <Paper className='results_search_bar_button__wrapper'>
          <IconButton className='results_search_bar_button__container' variant='contained' type='submit'>
            {loading ? <CircularProgress className='spinner__small' /> : <SearchIcon style={iconStyle} />}
          </IconButton>
        </Paper>
      </form>
    </Paper>
  )
}

export default ResultsSearchBar
