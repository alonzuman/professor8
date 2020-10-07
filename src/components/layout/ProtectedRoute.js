import { CircularProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { setUser, signOut } from '../../actions/auth'
import { app } from '../../firebase'

const ProtectedRoute = ({ component: Component, path, minRole, ...rest }) => {
  const [pageLoading, setPageLoading] = useState(true)
  const { role, isAuth, loading, anonymous } = useSelector(state => state.auth)
  const [condition, setCondition] = useState(false)
  const dispatch = useDispatch()
  const currentUser = app.auth().currentUser

  useEffect(() => {
    setCondition(role >= minRole)
    app.auth().onAuthStateChanged(async user => {
      if (user) {
        await dispatch(setUser(user))
        await setPageLoading(false)
      } else {
        dispatch(signOut())
        await setPageLoading(false)
      }
    })

  }, [dispatch, currentUser, role])

  if (pageLoading || loading) {
    return <div className='page__container flex flex__column align__center justify__center'><CircularProgress color='primary' /></div>
  } else if (!pageLoading && isAuth && condition) {
    return <Route {...rest} render={props => <Component {...props} />} />
  } else if (!pageLoading && (anonymous || !condition || !role)) {
    return <Redirect to='/' />
  }
}

export default ProtectedRoute
