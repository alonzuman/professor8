import { CircularProgress, IconButton, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import SearchBar from '../../../components/general/SearchBar'
import heb from '../../../utils/translation/heb'
import SearchIcon from '@material-ui/icons/Search';
import './ResultsSearchBar.css';
import { useHistory } from 'react-router-dom';
import { validateStringInput } from '../../../utils';
import qs from 'query-string'
import { useSelector } from 'react-redux';
import useWindowSize from '../../../hooks/useWindowSize';
import useScrollPosition from '../../../hooks/useScrollPosition';

const ResultsSearchBar = ({ customClassName }) => {
  const { loading } = useSelector(state => state.professors)
  const [className, setClassName] = useState('')
  const [schools, setSchools] = useState('')
  const [name, setName] = useState('')
  const history = useHistory()
  const { pathname } = useHistory().location
  const { windowWidth } = useWindowSize()
  const { scrollPosition } = useScrollPosition()

  useEffect(() => {
    const query = history.location.search;
    const parsedQuery = qs.parse(query)

    setSchools(parsedQuery.schools)
    setName(parsedQuery.name)
  }, [history.location.search])

  const handleSubmit = e => {
    e.preventDefault();

    if (validateStringInput(schools)) {
      const query = { schools, name }
      const stringifiedQuery = qs.stringify(query)

      history.push({
        pathname: '/search',
        search: stringifiedQuery
      })
    }
  }

  useEffect(() => {
    handleClassName()
  }, [pathname, scrollPosition, windowWidth])

  const handleClassName = () => {
    if (windowWidth <= 768) {
      return setClassName('results_search_bar__wrapper')
    }

    if (pathname === '/' && scrollPosition === 0) {
      return setClassName('results_search_bar__wrapper--maximized')
    } else if (pathname === '/search' && scrollPosition === 0) {
      return setClassName('results_search_bar__wrapper--maximized results_search_bar__wrapper--results_page')
    } else {
      return setClassName('')
    }
  }

  return (
    <div className={`results_search_bar__wrapper ${className} ${customClassName}`}>
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
            {loading ? <CircularProgress className='spinner__small' /> : <SearchIcon style={{ color: '#fff' }} />}
          </IconButton>
        </Paper>
      </form>
    </div>
  )
}

export default ResultsSearchBar
