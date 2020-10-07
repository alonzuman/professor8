import firebase from 'firebase'
import { db } from '../firebase'
import { setFeedback } from './feedback'
import store from '../store'
import heb from '../utils/translation/heb'
const authRef = db.collection('users')

export const getSavedLists = uid => async dispatch => {
  dispatch({
    type: 'SAVED/LOADING'
  })
  try {
    const snapshot = await authRef.doc(uid).collection('saved').get()
    let lists = {}
    let ids = []

    snapshot.forEach(doc => {
      ids.push(doc.id)
      const professor = { id: doc.id, ...doc.data() }
      const { list } = professor
      if (lists[list]) {
        lists[list] = [...lists[list], professor]
      } else {
        lists[list] = [professor]
      }
    })

    dispatch({
      type: 'SAVED/SET_ALL',
      payload: {
        lists,
        ids
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

export const saveProfessor = ({ professor, list }) => async dispatch => {
  const { uid } = store.getState().auth
  dispatch({
    type: 'SAVED/LOADING',
  })
  try {
    await authRef.doc(uid).collection('saved').doc(professor.id).set({
      ...professor,
      list
    }, { merge: true })

    dispatch({
      type: 'SAVED/SAVE_PROFESSOR',
      payload: { list, professor }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      severity: 'error',
      msg: heb.serverError
    }))
  }
}


export const unsaveProfessor = ({ professor, list }) => async dispatch => {
  const { uid } = store.getState().auth
  const { lists } = store.getState().saved
  dispatch({
    type: 'SAVED/LOADING'
  })
  try {
    await authRef.doc(uid).collection('saved').doc(professor.id).delete()

    const newLists = {
      ...lists,
      [list]: lists[list].filter(v => v.id !== professor.id)
    }

    dispatch({
      type: 'SAVED/UNSAVE_PROFESSOR',
      payload: { lists: newLists, professor }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      severity: 'error',
      msg: heb.serverError
    }))
  }
}
