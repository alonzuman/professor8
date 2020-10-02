import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import HeroSvg from '../../../assets/svgs/Students'
import { validateStringInput } from '../../../utils/form'
import HomeSearchBar from './HomeSearchBar'
import qs from 'query-string'
import './HomeHero.css'

const HomeHero = () => {
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
    <div className='hero__container'>
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

export default HomeHero
