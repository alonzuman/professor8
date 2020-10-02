import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss';
import SchoolCard from '../../../components/cards/SchoolCard';
import heb from '../../../utils/translation/heb';
import './SchoolsSwiper.css'
import qs from 'query-string'

const schools = [
  { name: 'האוניברסיטה הפתוחה', icon: 'bye' },
  { name: 'אוניברסיטת תל אביב', icon: 'bye' },
  { name: 'האוניברסיטה העברית', icon: 'bye' },
  { name: 'המרכז הבינתחומי הרצליה', icon: 'bye' },
  { name: 'המרכז האקדמי למשפט ועסקים', icon: 'bye' },
]

const SchoolsSwiper = () => {
  const history = useHistory()
  const [width, setWidth] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  })

  const options = {
    slidesPerView: width < 768 ? 1.5 : 4,
    spaceBetween: 16
  }

  const handleClick = school => {
    const query = {
      schools: school,
    }

    const stringifiedQuery = qs.stringify(query)

    history.push({
      pathname: '/search',
      search: stringifiedQuery
    })
  }

  return (
    <div className='schools_section'>
      <Typography variant='h3'>{heb.schools}</Typography>
      <div className='schools_swiper__container'>
        <Swiper {...options}>
          {schools?.map((v, i) => <SwiperSlide onClick={() => handleClick(v.name)} key={i}><SchoolCard school={v} /></SwiperSlide>)}
        </Swiper>
      </div>
    </div>
  )
}

export default SchoolsSwiper
