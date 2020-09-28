import { db } from "../firebase"
const tagsRef = db.collection('tags')

export const getTags = () => async dispatch => {
  dispatch({
    type: 'TAGS/LOADING'
  })
  try {
    const snapshot = await tagsRef.get()
    let results = {}
    snapshot.forEach(doc => results[doc.id] = {...doc.data()})
    dispatch({
      type: 'TAGS/SET_ALL',
      payload: {...results}
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'TAGS/ERROR'
    })
  }
}
