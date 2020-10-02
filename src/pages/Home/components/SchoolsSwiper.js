import { Typography } from '@material-ui/core';
import React from 'react'
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
]

const SchoolsSwiper = () => {
  const history = useHistory()
  const options = {
    slidesPerView: 2.4,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  }

  const handleClick = school => {
    const query = {
      schools: school
    }

    const stringifiedQuery = qs.stringify(query)

    history.push({
      pathname: '/search',
      search: stringifiedQuery
    })
  }

  return (
    <div className='schools_swiper__container'>
      <Typography variant='h3'>{heb.schools}</Typography>
      <Swiper {...options}>
        {schools?.map((v, i) => <SwiperSlide onClick={() => handleClick(v.name)} key={i}><SchoolCard school={v} /></SwiperSlide>)}
      </Swiper>
    </div>
  )
}

export default SchoolsSwiper
