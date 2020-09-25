import React, { useEffect, useState } from 'react'
import Review from '../components/cards/Review'
import { db } from '../firebase'

const ReviewsList = ({ id }) => {
  const [loading, setLoading] = useState(false)
  const [reviews, setReviews] = useState([])

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const snapshot = await db.collection('professors').doc(id).collection('reviews').get()
      let result = []
      snapshot.forEach(doc => result.push({ id: doc.id, ...doc.data() }))
      setReviews(result)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => { fetchReviews() }, [])

  return (
    <div className='reviews_list__container'>
      {reviews?.map((review, index) => <Review review={review} key={index} />)}
    </div>
  )
}

export default ReviewsList
