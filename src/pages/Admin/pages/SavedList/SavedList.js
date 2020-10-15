import { Skeleton } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSavedList } from '../../../../actions/saved'
import ProfessorCard from '../../../../components/cards/ProfessorCard'
import PageHeader from '../../../../components/layout/PageHeader'
import EditList from './components/EditList'

const SavedList = ({ match }) => {
  const { list, loading, lists } = useSelector(state => state.saved)
  const dispatch = useDispatch()
  const { lid } = match.params

  useEffect(() => {
    const list = lists?.find(v => v.id === lid)
    if (list) {
      dispatch(getSavedList({ lid, list }))
    }
  }, [lists, lid])

  return (
    <div className='rtl p-2'>
      <PageHeader
        backButton
        title={loading ? <Skeleton width={104} /> : list.name}
        action={<EditList id={lid} />}
      />
      {!loading && list?.professors?.map((v, i) => <ProfessorCard key={i} professor={v} />)}
    </div>
  )
}

export default SavedList
