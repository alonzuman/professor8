import { db } from "../firebase"
import qs from 'query-string'
import firebase from 'firebase'
import { setFeedback } from '../actions'
import heb from "../utils/translation/heb"
import { addReview, getProfessorReviews } from "./reviews"
import store from "../store"
const professorsRef = db.collection('professors')
const tagsRef = db.collection('tags')

export const setFilters = filters => {
  return {
    type: 'PROFESSORS/SET_FILTERS',
    payload: filters
  }
}

export const addProfessorAndReview = ({ professor, review }) => async dispatch => {
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  const { name } = professor
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

export const loadMoreProfessors = ({ last }) => async dispatch => {
  dispatch({
    type: 'PROFESSORS/LOADING'
  })

  try {
    dispatch(getProfessors(last))
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'PROFESSORS/ERROR'
    })
    dispatch(setFeedback({
      msg: heb.serverError,
      severity: 'error'
    }))
  }
}

export const getProfessors = (last) => async dispatch => {
  const parsed = qs.parse(window.location.search)
  const { professors } = store.getState().professors
  const { schools, name } = parsed

  if (!last) {
    dispatch({
      type: 'PROFESSORS/CLEAR_ALL'
    })
    dispatch({
      type: 'PROFESSORS/LOADING'
    })
  } else {
    dispatch({
      type: 'PROFESSORS/FETCHING_MORE'
    })
  }

  if (schools || name) {
    try {
      let snapshot;
      if (schools && name) {
        if (last) {
          snapshot = await professorsRef.where("school", "==", schools).where('name', '==', name).orderBy('dateCreated', 'desc').startAfter(last?.dateCreated).limit(10).get()
        } else {
          snapshot = await professorsRef.where("school", "==", schools).where('name', '==', name).orderBy('dateCreated', 'desc').limit(10).get()
        }
      } else if (schools) {
        if (last) {
          snapshot = await professorsRef.where("school", "==", schools).orderBy('dateCreated', 'desc').startAfter(last?.dateCreated).limit(10).get()
        } else {
          snapshot = await professorsRef.where("school", "==", schools).orderBy('dateCreated', 'desc').limit(10).get()
        }
      }
      let results = []
      snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))
      dispatch({
        type: 'PROFESSORS/SET_ALL',
        payload: {
          professors: last ? [...professors, ...results.filter(v => v.approved)] : [...results.filter(v => v.approved)],
          lastProfessorId: last?.id,
          filters: {
            schools,
            name
          }
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
    await professorsRef.doc(id).delete()
    await tagsRef.doc('professors').update({
      [school]: firebase.firestore.FieldValue.arrayRemove(name)
    })

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

export const updateProfessor = professor => async dispatch => {
  dispatch({
    type: 'PROFESSORS/LOADING'
  })

  await professorsRef.doc(professor.id).update({
    name: professor?.name,
    school: professor?.school
  })

  try {
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
