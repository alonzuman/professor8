import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react'
import { getLatestReviews } from '../../../actions/reviews';
import ReviewCard from '../../../components/cards/ReviewCard';
import 'swiper/swiper.scss';
import './LatestReviews.css';
import { Typography } from '@material-ui/core';
import heb from '../../../utils/translation/heb';
import { Link } from 'react-router-dom';
import ReviewSkeleton from '../../../components/cards/ReviewSkeleton';

const LatestReviews = () => {
  const { reviews, loading } = useSelector(state => state.reviews)
  const viewWidth = window.innerWidth
  const dispatch = useDispatch()

  const slidesCount = () => {
    if (viewWidth <= 512) {
      return 1.2
    } else if (512 < viewWidth && viewWidth <= 768) {
      return 1.2
    } else if (768 < viewWidth && viewWidth <= 900) {
      return 2
    } else {
      return 2.98
    }
  }

  const options = {
    slidesPerView: slidesCount(),
    spaceBetween: 16
  }

  useEffect(() => {
    dispatch(getLatestReviews())
  }, [])

  return (
    <div className='latest_reviews__container'>
      <div className='flex align__center justify__between pr-2'>
        <Typography variant='h3'>{heb.latestReviews}</Typography>
      </div>
      {loading &&
        <div className='p-2'>
          <ReviewSkeleton className='mw-512' />
        </div>}
      {!loading &&
        <Swiper {...options}>
          {reviews?.map((v, i) => <SwiperSlide key={i}><Link to={`/professor/${v.pid}`}><ReviewCard showActions={false} professor={{ id: v.pid }} showProfessor review={v} /></Link></SwiperSlide>)}
        </Swiper>}
    </div>
  )
}

export default LatestReviews
