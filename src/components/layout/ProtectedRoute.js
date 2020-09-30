import { CircularProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { setUser, signOut } from '../../actions/auth'
import { app } from '../../firebase'

const ProtectedRoute = ({ component: Component, path, minRole, ...rest }) => {
  const [pageLoading, setPageLoading] = useState(true)
  const { role, isAuth, loading } = useSelector(state => state.auth)
  const [condition, setCondition] = useState(false)
  const dispatch = useDispatch()
  const currentUser = app.auth().currentUser

  useEffect(() => {
    app.auth().onAuthStateChanged(async user => {
      if (user) {
        await dispatch(setUser(user))
        setPageLoading(false)
      } else {
        dispatch(signOut())
        setPageLoading(false)
        return <Redirect to='/' />
      }
    })

    setCondition(true)
  }, [dispatch, currentUser])

  return (
    <>
      {pageLoading && <CircularProgress color='primary' />}
      {!pageLoading && isAuth && condition && <Route {...rest} render={props => <Component {...props} />} />}
      {!pageLoading && !isAuth && !condition && <Redirect to='/' />}
    </>
  )
}

export default ProtectedRoute
