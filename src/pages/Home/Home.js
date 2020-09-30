import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import qs from 'query-string'
import { validateStringInput } from '../../utils/form'
import HeroSvg from '../../assets/svgs/Students'
import HomeSearchBar from './components/HomeSearchBar'
import './Home.css'

const Home = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [schools, setSchools] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    if (validateStringInput(schools)) {
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
  }

  return (
    <div className='home_content__container' dir='rtl'>
      <HeroSvg className='hero_svg' />
      <HomeSearchBar
        loading={loading}
        handleSubmit={handleSubmit}
        name={name}
        setName={setName}
        schools={schools}
        setSchools={setSchools}
      />
    </div>
  )
}

export default Home
