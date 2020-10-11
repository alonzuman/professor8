import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageHeader from '../../../../components/layout/PageHeader'
import ApproveProfessorsList from './ApproveProfessorsList'
import heb from '../../../../utils/translation/heb'
import { getAdminProfessors } from '../../../../actions/admin'

const ApproveProfessorsContainer = () => {
  const { loading, professors } = useSelector(state => state.admin)
  const dispatch = useDispatch()

  useEffect(() => {
    if (professors.length === 0) {
      dispatch(getAdminProfessors())
    }
  }, [dispatch, professors.length])

  return (
    <div className='rtl p-2'>
      <PageHeader sticky backButton title={heb.manageProfessors} />
      <ApproveProfessorsList loading={loading} professors={professors} />
    </div>
  )
}

export default ApproveProfessorsContainer
