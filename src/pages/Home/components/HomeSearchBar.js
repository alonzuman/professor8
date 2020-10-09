import { Button, CircularProgress, Paper, Typography } from '@material-ui/core'
import React from 'react'
import SearchBar from '../../../components/general/SearchBar'
import heb from '../../../utils/translation/heb'
import './HomeSearchBar.css'
import SearchIcon from '@material-ui/icons/Search';

const HomeSearchBar = ({ loading, handleSubmit, schools, setSchools, name, setName }) => {
  return (
    <div className='home_search_bar__wrapper'>
      <Paper className='rtl home_search_bar__container'>
        <Typography className='home__search_bar-title' variant='h1'>
          {heb.heroSlogan1} <span className='primary__light'>{heb.heroSlogan2}</span> {heb.heroSlogan3}
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className='flex align__center justify__between'>
            <SearchBar
              placeholder={heb.schoolName}
              collection='tags'
              doc='professors'
              filter='keys'
              search={schools}
              setSearch={setSchools}
              className='ml-1 bg-02'
            />
            <SearchBar
              placeholder={heb.professorName}
              collection='tags'
              doc='professors'
              filter={schools}
              search={name}
              setSearch={setName}
              className='bg-02'
              freeSolo
            />
          </div>
          <Button
            disabled={loading}
            variant='contained'
            color='primary'
            className='full__width-mobile mt-1'
            type='submit'
          >{loading ?
            <CircularProgress /> :
            <span className='flex align__center'>
              {heb.search}<SearchIcon className='mr-1'/>
            </span>}
          </Button>
        </form>
      </Paper>
    </div>
  )
}

export default HomeSearchBar
