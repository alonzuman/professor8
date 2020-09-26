import { db } from "../firebase"
import qs from 'query-string'
import firebase from 'firebase'
import store from "../store"
const professorsRef = db.collection('professors')

export const getProfessors = () => async dispatch => {
  const parsed = qs.parse(window.location.search)
  const { schools, name } = parsed
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  if (schools || name) {
    try {
      let snapshot;
      if (schools) {
        snapshot = await professorsRef.where("school.name", "==", schools).get()
      } else {
        snapshot = await professorsRef.where("name", "==", name).get()
      }
      let results = []
      snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))
      dispatch({
        type: 'PROFESSORS/SET_ALL',
        payload: results
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getProfessor = (id) => async dispatch => {
  console.log(`getting ${id}`)
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  try {
    const professorSnapshot = await professorsRef.doc(id).get()
    const reviewsSnapshot = await professorsRef.doc(id).collection('reviews').get()
    let professor = { id: professorSnapshot.id, ...professorSnapshot.data()}
    let reviews = []
    reviewsSnapshot.forEach(doc => reviews.push({ id: doc.id, ...doc.data() }))
    dispatch({
      type: 'PROFESSORS/SET_ONE',
      payload: { professor, reviews }
    })
  } catch (error) {
    console.log(error)
  }
}

export const clearProfessor = () => {
  return ({
    type: 'PROFESSORS/CLEAR_ONE'
  })
}

export const addReview = review => async dispatch => {
  const { id } = review;
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  try {
    await db.collection('professors').doc(id).set({
      lastReview: review
    }, { merge: true })
    await db.collection('professors').doc(id).collection('reviews').add(review)
    dispatch({
      type: 'PROFESSORS/ADD_REVIEW',
      payload: review
    })
  } catch (error) {
    console.log(error);
  }
}

export const getFilterOptions = collection => async dispatch => {
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  try {
    const snapshot = await db.collection(collection).get()
    let results = []
    snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))
    dispatch({
      type: 'PROFESSORS/SET_FILTER_OPTIONS',
      payload: results
    })
  } catch (error) {
    console.log(error)
  }
}

export const upVoteReview = review => async dispatch => {
  try {
    await professorsRef.doc(review.pid).collection('reviews').doc(review.id).update({
      upVotes: firebase.firestore.FieldValue.increment(1)
    })
    dispatch({
      type: 'PROFESSORS/UPVOTE_REVIEW',
      payload: review.id
    })
  } catch (error) {
    console.log(error)
  }
}

export const downVoteReview = review => async dispatch => {
  try {
    await professorsRef.doc(review.pid).collection('reviews').doc(review.id).update({
      upVotes: firebase.firestore.FieldValue.increment(-1)
    })
    dispatch({
      type: 'PROFESSORS/DOWNVOTE_REVIEW',
      payload: review.id
    })
  } catch (error) {
    console.log(error)
  }
}
