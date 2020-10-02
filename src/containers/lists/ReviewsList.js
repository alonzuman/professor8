import React, { useEffect, useState } from 'react'
import ReviewSkeleton from '../../components/cards/ReviewSkeleton'
import Review from '../../components/cards/Review'
import './ReviewsList.css'
import heb from '../../utils/translation/heb'
import { Button, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import NoReviews from './NoReviews'
import { useSelector } from 'react-redux'
import ReviewsSwiper from './ReviewsSwiper'

const ReviewsList = ({ addReview, professor, reviews, loading }) => {
  const { isAuth } = useSelector(state => state.auth)
  const [width, setWidth] = useState()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='page__section'>
      {!loading && reviews?.length && professor !== 0 && isAuth && <Button variant='contained' className='mt-1 mb-2' color='primary' onClick={addReview}>{heb.addReview}</Button>}
      {loading && <Skeleton width={104} height={64} />}
      <div className='flex align__center justify__between'>
        <Typography variant='subtitle1'>{!loading ? reviews?.length > 0 ? heb.reviews : '' : <Skeleton width={120} />}</Typography>
        {reviews?.length > 4 && <Button className='small__btn mobile__hide ml-2' color='primary' onClick={() => setShow(!show)}>{loading ? <Skeleton width={80} /> : show ? heb.hide : heb.showAll}</Button>}
        {loading && <Button className='small__btn ml-2' color='primary'><Skeleton width={80} /></Button>}
      </div>

      <ReviewsSwiper loading={loading} reviews={reviews} professor={professor} viewWidth={width} />
      {!loading && reviews?.length === 0 && <NoReviews handleClick={addReview} />}
    </div>
  )
}

export default ReviewsList
