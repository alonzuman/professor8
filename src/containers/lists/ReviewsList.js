import React, { useEffect, useState } from 'react'
import ReviewSkeleton from '../../components/cards/ReviewSkeleton'
import Review from '../../components/cards/Review'
import './ReviewsList.css'
import heb from '../../utils/translation/heb'
import { Button, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import NoReviews from './NoReviews'

const ReviewsList = ({ addReview, professor, reviews, loading }) => {
  const [width, setWidth] = useState()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    console.log(width)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='page__section carousel__fix'>
      <div className='flex align__center justify__between'>
        <Typography variant='subtitle1'>{!loading ? reviews?.length > 0 ? heb.reviews : '' : <Skeleton width={120} />}</Typography>
        {reviews?.length !== 0 && <Button className='small__btn ml-2' color='primary' onClick={() => setShow(!show)}>{loading ? <Skeleton width={80} /> : show ? heb.hide : heb.showAll}</Button>}
        {loading && <Button className='small__btn ml-2' color='primary'><Skeleton width={80} /></Button>}
      </div>
      <div className='reviews_list__container'>
        {loading && [0, 0, 0, 0]?.map((v, i) => <ReviewSkeleton key={i} />)}
        {!loading && reviews?.map((review, i) => {
          if (width <= 768) {
            return <Review professor={professor} review={review} key={i} />
          } else if (show) {
            return <Review professor={professor} review={review} key={i} />
          } else if (i <= 3) {
            return <Review professor={professor} review={review} key={i} />
          }
        })}
        {!loading && reviews?.length === 0 && <NoReviews handleClick={addReview} />}
      </div>
      {!loading && reviews?.length !== 0 && <Button variant='contained' className='mt-2' color='primary' onClick={addReview}>{heb.addReview}</Button>}
      {loading && <Skeleton width={104} height={64} />}
    </div>
  )
}

export default ReviewsList
