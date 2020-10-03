import { db } from "../firebase"
import firebase from 'firebase'
import { setAlert } from "./alerts"
import heb from "../utils/translation/heb"
const tagsRef = db.collection('tags')

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
    dispatch(setAlert({
      msg: heb.serverError,
      type: 'error'
    }))
  }
}

export const adminApproveReview = review => async dispatch => {
  const { id, pid, tags, rating } = review;
  dispatch({
    type: 'ADMIN/LOADING'
  })
  try {
    const professorReviewsSnap = await db.collection('professors').doc(pid).collection('reviews').get()
    const professorSnap = await db.collection('professors').doc(pid).get()
    const professor = { id: professorSnap.id, ...professorSnap.data() }

    const { overallRating } = professor
    const total = professorReviewsSnap.size || 0
    let overall;

    if (total === 0) {
      overall = rating
    } else {
      overall = (((overallRating * total) + rating) / (total + 1))
    }

    // 1. add tags to tags/professorTags
    tags.forEach(async v => {
      await tagsRef.doc('professorTags').update({
        tags: firebase.firestore.FieldValue.arrayUnion(v)
      })
    })

    // 2. correct overall settings of professor
    let tagsObj = {}
    tags.map(v => {
      if (Object.keys(professor.tags).includes(v)) {
        tagsObj[v] = (professor.tags[v] + 1)
      } else {
        tagsObj[v] = 1
      }
    })

    // 3. add rating to professors average rating and increment reviews count
    await db.collection('professors').doc(pid).set({
      numberOfReviews: firebase.firestore.FieldValue.increment(1),
      overallRating: overall,
      tags: tagsObj
    }, { merge: true })

    await db.collection('professors').doc(pid).collection('reviews').doc(id).set({
      ...review,
      approved: true
    })

    await db.collection('reviews').doc(id).delete()
    dispatch({
      type: 'ADMIN/APPROVE_REVIEW',
      payload: id
    })
    dispatch(setAlert({
      msg: heb.reviewAdded,
      type: 'success'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      msg: heb.serverError,
      type: 'error'
    }))
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
    dispatch(setAlert({
      msg: heb.reviewDeleted,
      type: 'success'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      msg: heb.serverError,
      type: 'error'
    }))
  }
}
