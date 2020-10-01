import { db } from "../firebase"

export const getAdminReviews = () => async dispatch => {
  dispatch({
    type: 'ADMIN/LOADING'
  })
  try {
    const snapshot = await db.collection('reviews').where('approved', '==', false).get()
    let results = []

    snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))

    dispatch({
      type: 'ADMIN/SET_REVIEWS',
      payload: {
        reviews: results
      }
    })
  } catch (error) {
    console.log(error)
  }
}
