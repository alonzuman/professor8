import { Button, CircularProgress } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import PageHeader from '../../components/layout/PageHeader'
import heb from '../../utils/translation/heb'
import qs from 'query-string'

const Schools = () => {
  const schools = useSelector(state => state?.tags?.schools?.names)
  const history = useHistory()

  const handleClick = school => {
    const query = {
      schools: school
    }

    const stringifiedQuery = qs.stringify(query)

    history.push({
      pathname: 'search',
      search: stringifiedQuery
    })
  }

  return (
    <div className='rtl p-2'>
      <PageHeader backButton title={heb.schoolsList} />
      {!schools &&
        <div className='page__container flex flex__column align__center justify__center'>
          <CircularProgress />
        </div>}
      {schools?.map((v, i) => <Button key={i} className='ml-1 mb-1' variant='outlined' onClick={() => handleClick(v)}>{v}</Button>) }
    </div>
  )
}

export default Schools
