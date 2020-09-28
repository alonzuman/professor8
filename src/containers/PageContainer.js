import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { anonymousAuth, setUser } from '../actions/auth'
import { getTags } from '../actions/tags'
import { auth } from '../firebase'

const PageContainer = ({ children }) => {
  const dispatch = useDispatch()
  const [height, setHeight] = useState()

  useEffect(() => { dispatch(getTags()) }, [])
  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight - 136)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  })

  useEffect(() => {
    auth.onAuthStateChanged(async user => {
      if (user) {
        dispatch(setUser(user))
      } else {
        dispatch(anonymousAuth())
      }
    })
  }, [])

  return (
    <div style={{ minHeight: height }} className='page__container'>
      {children}
    </div>
  )
}

export default PageContainer
