import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss';

const SchoolsSwiper = () => {
  const options = {
    slidesPerView: 3.4,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  }

  return (
    <div className='page__section'>
      <Swiper {...options}>
        <SwiperSlide>
          School 1
        </SwiperSlide>
        <SwiperSlide>
          School 1
        </SwiperSlide>
        <SwiperSlide>
          School 1
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default SchoolsSwiper
