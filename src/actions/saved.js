import firebase, { firestore } from 'firebase'
import { db } from '../firebase'
import { setFeedback } from './feedback'
import store from '../store'
import heb from '../utils/translation/heb'
const authRef = db.collection('users')
const savedRef = db.collection('savedLists')
const professorsRef = db.collection('professors')

export const getSavedList = ({ list }) => async dispatch => {
  dispatch({
    type: 'SAVED/CLEAR_ONE'
  })
  dispatch({
    type: 'SAVED/LOADING'
  })

  try {
    const { professorIds } = list

    let professors = []
    if (professorIds.length !== 0) {
      const professorsSnap = await professorsRef.where(firestore.FieldPath.documentId(), 'in', professorIds).get()
      professorsSnap.forEach(doc => professors.push({ id: doc.id, ...doc.data() }))
    }

    dispatch({
      type: 'SAVED/SET_ONE',
      payload: {
        ...list,
        professors
      }
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'SAVED/ERROR'
    })
    dispatch(setFeedback({
      severity: 'error',
      msg: heb.serverError
    }))
  }
}

export const getSavedLists = uid => async dispatch => {
  dispatch({
    type: 'SAVED/LOADING'
  })
  try {
    const snapshot = await savedRef.where('uid', '==', uid).get()
    let lists = []
    snapshot.forEach(doc => lists.push({ id: doc.id, ...doc.data() }))

    dispatch({
      type: 'SAVED/SET_ALL',
      payload: { lists }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      severity: 'error',
      msg: heb.serverError
    }))
  }
}

export const saveProfessor = ({ pid, list }) => async dispatch => {
  const { uid, savedIds } = store.getState().auth
  const { lists } = store.getState().saved
  const lid = list.id
  dispatch({
    type: 'SAVED/LOADING',
  })
  try {
    let newLists = []

    await authRef.doc(uid).set({
      savedIds: firebase.firestore.FieldValue.arrayUnion(pid)
    }, { merge: true })

    if (lid) {
      // TODO set it up as a cloud function
      await savedRef.doc(lid).update({
        uid,
        professorIds: firebase.firestore.FieldValue.arrayUnion(pid)
      })
      newLists = [...lists.filter(v => v.id !== lid), { ...list, professorIds: [...list.professorIds, pid] }]
    } else {
      const listRef = await savedRef.add({
        ...list,
        uid,
        professorIds: [pid]
      })
      const newList = {
        id: listRef.id,
        ...list,
        professorIds: [pid]
      }
      newLists = lists ? [...lists, newList] : [newList]
    }

    dispatch({
      type: 'AUTH/SET_SAVED_IDS',
      payload: { savedIds: [...savedIds, pid] }
    })

    dispatch({
      type: 'SAVED/SET_ALL',
      payload: { lists: newLists }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      severity: 'error',
      msg: heb.serverError
    }))
  }
}


export const unsaveProfessor = ({ pid }) => async dispatch => {
  const { uid, savedIds } = store.getState().auth
  const { lists } = store.getState().saved
  dispatch({
    type: 'SAVED/LOADING'
  })
  try {
    // TODO set it up as a cloud function
    await authRef.doc(uid).set({
      savedIds: firebase.firestore.FieldValue.arrayRemove(pid)
    }, { merge: true })

    const list = lists.find(list => list.professorIds.includes(pid))
    const lid = list.id

    const filteredList = {
      ...list,
      professorIds: [...list?.professorIds?.filter(v => v !== pid)]
    }

    await savedRef.doc(lid).update({
      professorIds: firebase.firestore.FieldValue.arrayRemove(pid)
    })

    const newLists = [
      ...lists.filter(v => v.id !== lid),
      filteredList
    ]

    dispatch({
      type: 'AUTH/SET_SAVED_IDS',
      payload: { savedIds: [...savedIds.filter(v => v !== pid)] }
    })
    dispatch({
      type: 'SAVED/SET_ALL',
      payload: { lists: newLists }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      severity: 'error',
      msg: heb.serverError
    }))
  }
}
