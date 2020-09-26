import { db } from "../firebase"
const schoolsRef = db.collection('schools')

export const getSchools = () => async dispatch => {
  dispatch({
    type: 'SCHOOLS/LOADING'
  })

  try {

  } catch (error) {
    console.log(error)
  }
}

export const getSchool = name => async dispatch => {
  dispatch({
    type: 'SCHOOLS/LOADING'
  })
  try {
    const schoolSnap = await schoolsRef.where('name', '==', name).get()
    let results = []
    schoolSnap.forEach(doc => results.push({ id: doc.id, ...doc.data() }))
    const school = results[0]

    const departuresSnap = await schoolsRef.doc(school.id).collection('departures').get()
    let departures = []
    departuresSnap.forEach(doc => departures.push({ id: doc.id, ...doc.data() }))

    dispatch({
      type: 'SCHOOLS/SET_ONE',
      payload: {
        ...school,
        departures
      }
    })
  } catch (error) {
    console.log(error)
  }
}
