import { db } from "../firebase"
import store from '../store';
const professorsRef = db.collection('professors')

export const getProfessors = () => async dispatch => {
  const { institution, name } = store.getState().professors.filters
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  try {
    let snapshot = {}
    if (institution) {
      snapshot = await professorsRef.where('institution.name', '==', institution).get()
    } else if (name) {
      snapshot = await professorsRef.where('name', '==', name).get()
    } else {
      snapshot = await professorsRef.get()
    }
    let res = []
    snapshot.forEach(doc => res.push({ id: doc.id, ...doc.data() }))
    dispatch({
      type: 'PROFESSORS/SET_ALL',
      payload: res
    })
  } catch (error) {
    console.log(error)
  }
}

export const setFilters = (filters) => {
  return ({
    type: 'PROFESSORS/SET_FILTERS',
    payload: filters
  })
}

export const getProfessor = (id) => async dispatch => {
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  try {
    const professorSnapshot = await professorsRef.doc(id).get()
    const reviewsSnapshot = await professorsRef.doc(id).collection('reviews').get()
    let professor = {
      id: professorSnapshot.id,
      ...professorSnapshot.data()
    }
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
