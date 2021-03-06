import { Button, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss';
import SchoolCard from '../../../components/cards/SchoolCard';
import heb from '../../../utils/translation/heb';
import './SchoolsSwiper.css'
import qs from 'query-string'
import useWindowSize from '../../../hooks/useWindowSize';

const schools = [
  { name: 'האוניברסיטה הפתוחה', icon: 'bye' },
  { name: 'אוניברסיטת תל אביב', icon: 'bye' },
  { name: 'האוניברסיטה העברית', icon: 'bye' },
  { name: 'המרכז הבינתחומי הרצליה', icon: 'bye' },
  { name: 'המרכז האקדמי למשפט ועסקים', icon: 'bye' },
]

const SchoolsSwiper = () => {
  const history = useHistory()
  const { windowWidth } = useWindowSize()

  const options = {
    slidesPerView: windowWidth <= 768 ? 1.2 : 3.98,
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

  const handleLinkClick = () => {
    history.push({
      pathname: '/schools'
    })
  }

  return (
    <div className='schools_section'>
      <div className='flex align__center justify__between pr-2 pl-2'>
        <Typography variant='h3'>{heb.schools}</Typography>
        <Button onClick={handleLinkClick} color='primary' className='small__btn'>{heb.showAll}</Button>
      </div>
      <Swiper {...options}>
        {schools?.map((v, i) => <SwiperSlide onClick={() => handleClick(v.name)} key={i}><SchoolCard school={v} /></SwiperSlide>)}
      </Swiper>
    </div>
  )
}

export default SchoolsSwiper
