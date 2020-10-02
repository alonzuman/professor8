import React from 'react'
import { Chip } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const ProfessorTags = ({ tags, reviewsCount, loading }) => {

  if (loading) {
    return (
      <div className='page__section flex flex__wrap--wrap'>
        {!tags && [0, 0, 0, 0].map((v, i) => <Skeleton key={i} className='ml-2' height={48} width={68} />)}
      </div>
    )
  }
  if (reviewsCount === 0) {
    {/* {!tags && [0, 0, 0, 0].map((v, i) => <Skeleton key={i} className='ml-2' height={48} width={68} />)} */}
    return <div />
  } else {
    return (
      <div className='page__section flex flex__wrap--wrap'>
        {tags && Object.keys(tags)?.sort((a, b) => { return tags[b] - tags[a] }).map((v, i) => {
          if (i <= 4 && tags[v] !== 0) {
            return (
            <Chip
              className='width__fit--content mb-1 ml-1'
              dir='rtl'
              color='secondary'
              label={<span>{v} ({tags[v]})</span>}
              key={i}
            />)
          }
        })}
      </div>
    )
  }
}

export default ProfessorTags
