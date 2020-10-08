import { db } from "../firebase"
import firebase from 'firebase'
import heb from "../utils/translation/heb"
import { setFeedback } from "./feedback"
import { deleteProfessor } from "."
const tagsRef = db.collection('tags')

export const getAdminProfessors = () => async dispatch => {
  dispatch({
    type: 'ADMIN/LOADING'
  })
  try {
    const snapshot = await db.collection('professors').where('approved', '==', false).get()
    let results = []
    snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))
    dispatch({
      type: 'ADMIN/SET_PROFESSORS',
      payload: {
        professors: results
      }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      severity: 'error',
      msg: 'fuq'
    }))
    dispatch({
      type: 'ADMIN/ERROR'
    })
  }
}

export const getAdminReviews = () => async dispatch => {
  dispatch({
    type: 'ADMIN/LOADING'
  })
  try {
    const snapshot = await db.collection('pendingReviews').orderBy('dateCreated', 'desc').get()
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
    dispatch(setFeedback({
      msg: heb.serverError,
      severity: 'error'
    }))
  }
}

export const adminApproveReview = review => async dispatch => {
  const { id, pid } = review;
  dispatch({
    type: 'ADMIN/LOADING'
  })
  try {
    await db.collection('professors').doc(pid).collection('reviews').doc(id).update({
      approved: true
    })

    dispatch({
      type: 'ADMIN/APPROVE_REVIEW',
      payload: id
    })
    dispatch(setFeedback({
      msg: heb.reviewAdded,
      severity: 'success'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      msg: heb.serverError,
      severity: 'error'
    }))
  }
}

export const adminDeclineReview = review => async dispatch => {
  const { id, pid } = review
  dispatch({
    type: 'ADMIN/LOADING'
  })
  try {
    await db.collection('professors').doc(pid).collection('reviews').doc(id).update({
      approved: false
    })

    dispatch({
      type: 'ADMIN/DECLINE_REVIEW',
      payload: id
    })
    dispatch(setFeedback({
      msg: heb.reviewDeleted,
      severity: 'success'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      msg: heb.serverError,
      severity: 'error'
    }))
  }
}

export const adminApproveProfessor = ({ pid, school, name }) => async dispatch => {
  dispatch({
    type: 'ADMIN/LOADING'
  })
  try {
    await db.collection('professors').doc(pid).update({
      approved: true
    })

    await db.collection('tags').doc('professors').update({
      [school]: firebase.firestore.FieldValue.arrayUnion(name)
    })

    dispatch({
      type: 'ADMIN/APPROVE_PROFESSOR',
      payload: pid
    })
  } catch (error) {
    console.log(error);
    dispatch(setFeedback({
      severity: 'error',
      msg: 'fuq'
    }))
    dispatch({
      type: 'ADMIN/ERROR'
    })
  }
}

export const adminDeclineProfessor = ({ pid, name, school }) => async dispatch => {
  dispatch({
    type: 'ADMIN/LOADING'
  })
  try {
    await dispatch(deleteProfessor({ id: pid, name, school }))
    dispatch({
      type: 'ADMIN/DECLINE_PROFESSOR',
      payload: pid
    })
  } catch (error) {
    console.log(error);
    dispatch(setFeedback({
      severity: 'error',
      msg: 'fuq'
    }))
    dispatch({
      type: 'ADMIN/ERROR'
    })
  }
}
