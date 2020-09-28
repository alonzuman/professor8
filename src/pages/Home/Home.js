import { Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import qs from 'query-string'
import heb from '../../utils/translation/heb'
import { validateStringInput } from '../../utils/form'
import HeroSvg from '../../assets/svgs/Students'
import HomeSearchBar from './components/HomeSearchBar'
import './Home.css'
import Certification from '../../assets/svgs/Certification'
import NoResultsFound from '../../assets/svgs/NoResultsFound'
import Maths from '../../assets/svgs/Maths'
import Trends from '../../assets/svgs/Trends'

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
      <Trends className='bottom_right__svg' />
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
