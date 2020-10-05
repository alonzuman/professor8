import { db } from "../firebase"
import heb from "../utils/translation/heb"
import { setFeedback } from "./feedback"
const reviewsRef = db.collection('reviews')

export const getLatestReviews = () => async dispatch => {
  dispatch({
    type: 'REVIEWS/LOADING'
  })
  try {
    const snapshot = await reviewsRef.orderBy('dateCreated', 'desc').limit(10).get()
    let results = []
    snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))
    dispatch({
      type: 'REVIEWS/SET_ALL',
      payload: {
        reviews: results.filter(v => v.approved)
      }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      severity: 'error',
      msg: heb.serverError
    }))
  }
}
