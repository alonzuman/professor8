import { Button, CircularProgress } from '@material-ui/core'
import React from 'react'
import SearchBar from '../../../components/general/SearchBar'
import heb from '../../../utils/translation/heb'
import SearchIcon from '@material-ui/icons/Search';
import './ResultsSearchBar.css';

const ResultsSearchBar = ({ loading, handleSubmit, schools, setSchools, name, setName }) => {
  return (
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
      <Button className='br-32' variant='contained' color='primary' type='submit'>{loading ? <CircularProgress className='spinner__small' /> : <SearchIcon />}</Button>
    </form>
  )
}

export default ResultsSearchBar
