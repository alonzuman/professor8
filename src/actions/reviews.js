import firebase from 'firebase'
import { db } from "../firebase"
import store from '../store'
import heb from "../utils/translation/heb"
import { setFeedback } from "./feedback"
const reviewsRef = db.collection('latestReviews')
const professorsRef = db.collection('professors')

export const getProfessorReviews = pid => async dispatch => {
  dispatch({
    type: 'REVIEWS/LOADING'
  })
  try {
    const snapshot = await professorsRef.doc(pid).collection('reviews').orderBy('dateCreated', 'desc').get()
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


export const addReview = ({ review, professor }) => async dispatch => {
  const { role } = store.getState().auth
  dispatch({
    type: 'REVIEWS/LOADING'
  })
  try {
    let newReview = {
      dateCreated: Date.now(),
      professor,
      pid: professor.id,
      ...review,
      approved: role >= 3 ? true : false
    }

    const snapshot = await db.collection('reviews').add(newReview)

    newReview = { ...newReview, id: snapshot.id }

    if (role >= 3) {
      await db.collection('professors').doc(professor.id).collection('reviews').doc(snapshot.id).set(newReview)
      dispatch({
        type: 'REVIEWS/ADD_ONE',
        payload: newReview
      })
    } else {
      dispatch({
        type: 'REVIEWS/CLEAR_LOADING',
      })
    }
    dispatch(setFeedback({
      severity: 'success',
      msg: heb.actionSuccessAndPending
    }))
  } catch (error) {
    console.log(error);
    dispatch(setFeedback({
      msg: heb.serverError,
      severity: 'error'
    }))
  }
}

export const deleteReview = ({ review, professor }) => async dispatch => {
  const { pid, id } = review;
  const { rating } = professor
  const { reviews } = store.getState().reviews
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  try {
    await db.collection('professors').doc(pid).collection('reviews').doc(review.id).delete()
    await db.collection('reviews').doc(id).delete()

    dispatch({
      type: 'REVIEWS/SET_ALL',
      payload: {
        reviews: [...reviews.filter(v => v.id !== review.id)]
      }
    })
    dispatch(setFeedback({
      severity: 'success',
      msg: heb.reviewDeleted
    }))
  } catch (error) {
    console.log(error);
    dispatch(setFeedback({
      msg: heb.serverError,
      severity: 'error'
    }))
  }
}


export const upVoteReview = ({ review, uid, pid }) => async dispatch => {
  const { id } = review;
  try {
    await professorsRef.doc(pid).collection('reviews').doc(id).update({
      votes: firebase.firestore.FieldValue.increment(1),
      upVotesArray: firebase.firestore.FieldValue.arrayUnion(uid),
      downVotesArray: firebase.firestore.FieldValue.arrayRemove(uid)
    })
    dispatch({
      type: 'PROFESSORS/UPVOTE_REVIEW',
      payload: id
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      msg: heb.serverError,
      severity: 'error'
    }))
  }
}

export const downVoteReview = ({ review, uid }) => async dispatch => {
  try {
    await professorsRef.doc(review.pid).collection('reviews').doc(review.id).update({
      votes: firebase.firestore.FieldValue.increment(-1),
      upVotesArray: firebase.firestore.FieldValue.arrayRemove(uid),
      downVotesArray: firebase.firestore.FieldValue.arrayUnion(uid)
    })
    dispatch({
      type: 'PROFESSORS/DOWNVOTE_REVIEW',
      payload: review.id
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      msg: heb.serverError,
      severity: 'error'
    }))
  }
}
