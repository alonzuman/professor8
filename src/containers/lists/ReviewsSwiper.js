import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss';
import Review from '../../components/cards/Review';
import ReviewSkeleton from '../../components/cards/ReviewSkeleton';

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
      { loading && [0, 0, 0].map((v, i) => <SwiperSlide key={i}><ReviewSkeleton /></SwiperSlide>) }
      { !loading && reviews?.map((v, i) => <SwiperSlide key={i}><Review professor={professor} review={v} /></SwiperSlide>) }
    </Swiper>
  )
}

export default ReviewsSwiper
