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
    // TODO add name filter
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
