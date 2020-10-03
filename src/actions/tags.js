import { db } from "../firebase"
import heb from "../utils/translation/heb"
import { setFeedback } from "./feedback"
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
    dispatch(setFeedback({
      severity: 'error',
      msg: heb.serverError
    }))
  }
}
