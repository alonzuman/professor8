import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import ReviewCard from '../../components/cards/ReviewCard';
import 'swiper/swiper.scss';

const ReviewsSwiper = ({ loading, reviews, professor, viewWidth }) => {
  const slidesCount = () => {
    if (viewWidth <= 512) {
      return 1.2
    } else if (512 < viewWidth && viewWidth <= 768) {
      return 1.8
    } else if (768 < viewWidth && viewWidth <= 900) {
      return 2
    } else {
      return 3
    }
  }

  const options = {
    slidesPerView: slidesCount(),
    spaceBetween: 16,
  }

  return (
    <Swiper {...options}>
      { !loading && reviews?.map((v, i) => <SwiperSlide key={i}><ReviewCard professor={professor} review={v} /></SwiperSlide>) }
    </Swiper>
  )
}

export default ReviewsSwiper
