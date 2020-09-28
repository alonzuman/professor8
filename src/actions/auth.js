import { auth } from "../firebase"

export const setUser = user => async dispatch => {
  const { uid, isAnonymous } = user
  dispatch({
    type: 'AUTH/LOADING'
  })
  try {
    // TODO fetch user from DB
    if (isAnonymous) {
      dispatch({
        type: 'AUTH/LOAD_USER',
        payload: { uid }
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'AUTH/ERROR'
    })
  }
}

export const anonymousAuth = () => async dispatch => {
  dispatch({
    type: 'AUTH/LOADING'
  })
  try {
    await auth.signInAnonymously()
    // TODO create a db record for anonymous users and store all data there
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'AUTH/ERROR'
    })
  }
}


export const signUp = () => async dispatch => {
  dispatch({
    type: 'AUTH/LOADING'
  })
  try {

  } catch (error) {
    console.log(error)
    dispatch({
      type: 'AUTH/ERROR'
    })
  }
}
