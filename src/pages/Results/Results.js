import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ProfessorsList from '../../containers/lists/ProfessorsList'
import qs from 'query-string'
import { useDispatch, useSelector } from 'react-redux'
import ResultsSearchBar from './components/ResultsSearchBar'
import { validateStringInput } from '../../utils/form'

const Results = () => {
  const { loading, professors } = useSelector(state => state.professors)
  const [page, setPage] = useState(1)
  const [pageLength, setPageLength] = useState(window.innerHeight)
  const [scroll, setScroll] = useState(window.scrollY)
  const [schools, setSchools] = useState('')
  const [name, setName] = useState('')
  const history = useHistory()

  useEffect(() => {
    const query = history.location.search;
    const parsedQuery = qs.parse(query)

    setSchools(parsedQuery.schools)
    setName(parsedQuery.name)
  }, [])

  const handleSubmit = e => {
    e.preventDefault();

    if (validateStringInput(schools)) {
      const query = {
        schools,
        name
      }
      const stringifiedQuery = qs.stringify(query)

      history.push({
        pathname: '/search',
        search: stringifiedQuery
      })
    }
  }

  const handleScroll = () => {
    setScroll(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    // if (scroll > 68) {
    //   setPageLength(oldVal => oldVal + 68)
    //   setPage(oldVal => oldVal + 1)
    //   console.log(page)
    //   console.log(pageLength)
    // }
    return () => window.removeEventListener('scroll', handleScroll)
  }, [window.scrollY])

  return (
    <div className='flex full__height align__center flex__column p-2'>
      <ResultsSearchBar
        loading={loading}
        schools={schools}
        setSchools={setSchools}
        name={name}
        setName={setName}
        handleSubmit={handleSubmit}
      />
      <ProfessorsList />
    </div>
  )
}

export default Results
