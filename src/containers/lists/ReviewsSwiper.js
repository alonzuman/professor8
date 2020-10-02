import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss';
import ReviewCard from '../../components/cards/ReviewCard';

const ReviewsSwiper = ({ loading, reviews, professor, viewWidth }) => {
  const slidesCount = () => {
    if (viewWidth <= 512) {
      return 1.2
    } else if (512 < viewWidth && viewWidth <= 768) {
      return 1.8
    } else if (768 < viewWidth && viewWidth <= 900) {
      return 2.4
    } else {
      return 3.2
    }
  }

  const options = {
    slidesPerView: slidesCount(),
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
    <Swiper style={{ marginLeft: viewWidth <= 768 ? -16 : '' }} {...options}>
      { !loading && reviews?.map((v, i) => <SwiperSlide key={i}><ReviewCard professor={professor} review={v} /></SwiperSlide>) }
    </Swiper>
  )
}

export default ReviewsSwiper
