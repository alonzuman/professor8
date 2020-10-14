import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSavedLists, setTheme } from '../actions'
import { anonymousAuth, setUser } from '../actions/auth'
import { getTags } from '../actions/tags'
import { auth } from '../firebase'
import useWindowSize from '../hooks/useWindowSize'

const PageContainer = ({ children }) => {
  const dispatch = useDispatch()
  const { uid } = useSelector(state => state.auth)
  const { windowHeight } = useWindowSize()

  useEffect(() => {
    auth.onAuthStateChanged(async user => {
      if (user) {
        dispatch(setUser(user))
      } else {
        dispatch(anonymousAuth())
      }
    })
  }, [dispatch])

  useEffect(() => {
    dispatch(setTheme())
  }, [dispatch])

  useEffect(() => {
    dispatch(getTags())
  }, [dispatch])

  useEffect(() => {
    if (uid) {
      dispatch(getSavedLists(uid))
    }
  }, [uid, dispatch])

  return (
    <div style={{ minHeight: windowHeight }} className='page__container'>
      {children}
    </div>
  )
}

export default PageContainer
