import firebase from 'firebase'
import { auth, db } from "../firebase"
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
        payload: { uid }
      })
    } else {
      const snapshot = await usersRef.doc(uid).get()
      dispatch({
        type: 'AUTH/LOAD_USER',
        payload: { uid, ...snapshot.data() }
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'AUTH/ERROR'
    })
  }
}

export const signOut = () => async dispatch => {
  return await auth.signOut()
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
          firstName: displayName?.split(' ')[0] || '',
          lastName: displayName?.split(' ')[1] || '',
          avatar: photoURL || '',
          phone: phoneNumber || '',
          role: 1,
          dateCreated: Date.now()
        }
        await usersRef.doc(uid).set(newUser, { merge: true })
        dispatch({
          type: 'AUTH/SET_USER',
          payload: { ...newUser }
        })
      } else {
        dispatch({
          type: 'AUTH/SET_USER',
          payload: { ...user }
        })
      }
    })
  } catch (error) {
    console.log(error)
    // const msg = () => {
    //   switch (error.code) {
    //     case 'auth/account-exists-with-different-credential': return 'accountAlreadyExistsWithEmail'
    //     default: return 'Server error'
    //   }
    // }
    dispatch({
      type: 'AUTH/ERROR'
    })
  }
}
