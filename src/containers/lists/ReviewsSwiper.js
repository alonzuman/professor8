import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss';
import Review from '../../components/cards/Review';

const ReviewsSwiper = ({ loading, reviews, professor, viewWidth }) => {
  const options = {
    slidesPerView: viewWidth <= 768 ? 1 : 3,
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
    <Swiper {...options}>
      { !loading && reviews?.map((v, i) => <SwiperSlide key={i}><Review professor={professor} review={v} /></SwiperSlide>) }
    </Swiper>
  )
}

export default ReviewsSwiper
