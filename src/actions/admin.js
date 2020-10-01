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

export const adminApproveReview = review => async dispatch => {
  const { id, pid } = review;
  dispatch({
    type: 'ADMIN/LOADING'
  })
  try {
    await db.collection('professors').doc(pid).collection('reviews').doc(id).set({
      ...review,
      approved: true
    })
    await db.collection('reviews').doc(id).delete()

    dispatch({
      type: 'ADMIN/APPROVE_REVIEW',
      payload: id
    })
    console.log('approved')
  } catch (error) {
    console.log(error)
  }
}

export const adminDeclineReview = review => async dispatch => {
  const { id } = review
  dispatch({
    type: 'ADMIN/LOADING'
  })
  try {
    await db.collection('reviews').doc(id).delete()

    dispatch({
      type: 'ADMIN/SET_REVIEWS',
      payload: id
    })
  } catch (error) {
    console.log(error)
  }
}
