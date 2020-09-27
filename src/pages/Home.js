import { Button, CircularProgress, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import SearchBar from '../components/general/SearchBar'
import qs from 'query-string'
import heb from '../utils/translation/heb'
import { db } from '../firebase'
import './Home.css'

const Home = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [schools, setSchools] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
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

  const titleStyle = {
    fontSize: 40,
    fontWeight: 700
  }

  return (
    <div className='home_content__container' dir='rtl'>
      <Typography style={titleStyle} variant='h1'>{heb.findProfessorsByReview}</Typography>
      <form onSubmit={handleSubmit}>
        <SearchBar
          placeholder={heb.schoolName}
          collection='tags'
          doc='professors'
          filter='keys'
          search={schools}
          setSearch={setSchools}
          freeSolo
        />
        <SearchBar
          placeholder={heb.professorName}
          collection='tags'
          doc='professors'
          filter={schools}
          search={name}
          setSearch={setName}
          freeSolo
        />
        <Button disabled={loading} variant='contained' color='primary' className='full__width-mobile mt-5' type='submit'>{loading ? <CircularProgress /> : heb.search}</Button>
      </form>
    </div>
  )
}

export default Home
