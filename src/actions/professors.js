import { db } from "../firebase"
import qs from 'query-string'
import firebase from 'firebase'
import { setFeedback } from '../actions'
import heb from "../utils/translation/heb"
import { addReview, getProfessorReviews } from "./reviews"
import store from "../store"
const professorsRef = db.collection('professors')
const tagsRef = db.collection('tags')
const reviewsRef = db.collection('reviews')
const authRef = db.collection('users')

export const addProfessorAndReview = ({ professor, review }) => async dispatch => {
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  const { name, school } = professor
  try {
    const professorSnap = await professorsRef.where('name', '==', name).get()
    let oldResults = []
    let snapshot = {};

    if (professorSnap.size !== 0) {
      professorSnap.forEach(doc => oldResults.push({ id: doc.id, ...doc.data() }))
      snapshot = oldResults[0]
      await professorsRef.doc(snapshot.id).set({
        ...professor,
        dateUpdated: Date.now()
      }, { merge: true })
    } else {
      snapshot = await professorsRef.add({
        approved: false,
        ...professor,
        tags: [],
        dateCreated: Date.now()
      })
    }

    const newProfessor = { id: snapshot.id, ...professor }
    const newReview = { pid: snapshot.id, ...review }

    await dispatch(addReview({ review: newReview, professor: newProfessor, isNew: true }))

    dispatch({
      type: 'PROFESSORS/ADD_ONE',
      payload: newProfessor
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'PROFESSORS/FAIL'
    })
    dispatch(setFeedback({
      msg: heb.serverError,
      severity: 'error'
    }))
  }
}

export const getProfessors = () => async dispatch => {
  const parsed = qs.parse(window.location.search)
  const { schools, name } = parsed
  dispatch({
    type: 'PROFESSORS/CLEAR_ALL'
  })
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  if (schools || name) {
    try {
      let snapshot;
      if (schools && name) {
        snapshot = await professorsRef.where("school", "==", schools).where('name', '==', name).get()
      } else if (schools) {
        snapshot = await professorsRef.where("school", "==", schools).get()
      } else {
        snapshot = await professorsRef.where("name", "==", name).get()
      }
      let results = []
      snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))
      dispatch({
        type: 'PROFESSORS/SET_ALL',
        payload: results.filter(v => v.approved)
      })
    } catch (error) {
      console.log(error)
      dispatch(setFeedback({
        msg: heb.serverError,
        severity: 'error'
      }))
    }
  }
}

export const getProfessor = (id) => async dispatch => {
  dispatch({
    type: 'PROFESSORS/CLEAR_PROFESSOR'
  })
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  dispatch(getProfessorReviews(id))
  try {
    const professorSnapshot = await professorsRef.doc(id).get()
    let professor = { id: professorSnapshot.id, ...professorSnapshot.data() }

    dispatch({
      type: 'PROFESSORS/SET_ONE',
      payload: {
        professor
      }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      msg: heb.serverError,
      severity: 'error'
    }))
  }
}

export const deleteProfessor = professor => async dispatch => {
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  const { id, school, name } = professor
  try {
    const reviewsSnap = await professorsRef.doc(id).collection('reviews').get()
    reviewsSnap.forEach(async doc => await professorsRef.doc(id).collection('reviews').doc(doc.id).delete())
    await professorsRef.doc(id).delete()
    await tagsRef.doc('professors').update({
      [school]: firebase.firestore.FieldValue.arrayRemove(name)
    })

    const generalReviewsSnap = await reviewsRef.where('pid', '==', id).get()
    generalReviewsSnap.forEach(async doc => await reviewsRef.doc(doc.id).delete())

    dispatch({
      type: 'PROFESSORS/DELETE_ONE',
      payload: id
    })
    dispatch(setFeedback({
      severity: 'success',
      msg: heb.deletedSuccessfully
    }))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      msg: heb.serverError,
      severity: 'error'
    }))
  }
}

export const saveProfessor = professor => async dispatch => {
  const { uid } = store.getState().auth
  dispatch({
    type: 'AUTH/LOADING',
  })
  try {
    await authRef.doc(uid).set({
      savedProfessors: firebase.firestore.FieldValue.arrayUnion(professor)
    }, { merge: true })
    dispatch({
      type: 'AUTH/SAVE_PROFESSOR',
      payload: professor
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      severity: 'error',
      msg: heb.serverError
    }))
  }
}

export const unsaveProfessor = professor => async dispatch => {
  const { uid } = store.getState().auth
  dispatch({
    type: 'AUTH/LOADING'
  })
  try {
    await authRef.doc(uid).set({
      savedProfessors: firebase.firestore.FieldValue.arrayRemove(professor)
    }, { merge: true })

    dispatch({
      type: 'AUTH/UNSAVE_PROFESSOR',
      payload: professor
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      severity: 'error',
      msg: heb.serverError
    }))
  }
}
