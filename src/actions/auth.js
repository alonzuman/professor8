import firebase from 'firebase'
import { auth, db } from "../firebase"
import heb from '../utils/translation/heb'
import { setFeedback } from './feedback'
const usersRef = db.collection('users')

export const setUser = user => async dispatch => {
  const { uid, isAnonymous } = user
  dispatch({
    type: 'AUTH/LOADING'
  })
  try {
    if (isAnonymous) {
      dispatch({
        type: 'AUTH/LOAD_USER',
        payload: {
          uid,
          anonymous: true,
          role: 0
        }
      })
    } else {
      const snapshot = await usersRef.doc(uid).get()
      if (snapshot.data()) {
        dispatch({
          type: 'AUTH/LOAD_USER',
          payload: { uid, ...snapshot.data(), anonymous: false }
        })
      } else {
        dispatch({
          type: 'AUTH/LOAD_USER',
          payload: {
            uid,
            anonymous: true,
            role: 0
          }
        })
      }
    }
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      severity: 'error',
      msg: heb.serverError
    }))
    dispatch({
      type: 'AUTH/ERROR'
    })
  }
}

export const signOut = () => async dispatch => {
  await auth.signOut()
  return dispatch({
    type: 'FEEDBACK/SET_ONE',
    payload: {
      msg: heb.signOutSuccessfully,
      severity: 'success'
    }
  })
}

export const anonymousAuth = () => async dispatch => {
  dispatch({
    type: 'AUTH/LOADING'
  })
  try {
    await auth.signInAnonymously()
    dispatch({
      type: 'AUTH/SET_USER',
      payload: {
        anonymous: true,
        role: 0
      }
    })
    return window.location.reload()
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      severity: 'error',
      msg: heb.serverError
    }))
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
    dispatch(setFeedback({
      severity: 'error',
      msg: heb.serverError
    }))
    dispatch({
      type: 'AUTH/ERROR'
    })
  }
}

export const signInWithProvider = (provider) => async dispatch => {
  dispatch({
    type: 'AUTH/LOADING'
  })
  try {
    const firebaseProvider = () => {
      switch (provider) {
        case 'facebook': return new firebase.auth.FacebookAuthProvider();
        case 'google': return new firebase.auth.GoogleAuthProvider();
        default: return null
      }
    }

    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(async () => {
      const result = await firebase.auth().signInWithPopup(firebaseProvider())
      const { uid, displayName, email, photoURL, phoneNumber } = result.user
      const fetchedUser = await usersRef.doc(uid).get()
      const user = fetchedUser.data()
      if (!user?.uid || !user) {
        const newUser = {
          uid,
          email,
          name: `${displayName?.split(' ')[0] || ''} ${displayName?.split(' ')[0] || ''}`,
          avatar: photoURL || '',
          phone: phoneNumber || '',
          role: 1,
          dateCreated: Date.now()
        }
        await usersRef.doc(uid).set(newUser, { merge: true })
        dispatch({
          type: 'AUTH/SET_USER',
          payload: { ...newUser, anonymous: false }
        })
      } else {
        dispatch({
          type: 'AUTH/SET_USER',
          payload: { ...user, anonymous: false }
        })
      }
    })
    dispatch(setFeedback({
      severity: 'success',
      msg: heb.welcome
    }))
  } catch (error) {
    console.log(error)
    const msg = () => {
      switch (error.code) {
        case 'auth/account-exists-with-different-credential': return heb.accountAlreadyExists
        default: return heb.serverError
      }
    }
    dispatch(setFeedback({
      severity: 'error',
      msg: msg()
    }))
    dispatch({
      type: 'AUTH/ERROR'
    })
  }
}
