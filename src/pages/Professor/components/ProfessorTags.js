import React from 'react'
import { Chip } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const ProfessorTags = ({ tags }) => {
  return (
    <div className='page__section flex flex__wrap--wrap'>
      {!tags && [0, 0, 0, 0].map((v, i) => <Skeleton key={i} className='ml-2' height={48} width={104} />)}
      {tags && Object.keys(tags)?.sort((a, b) => { return tags[b] - tags[a] }).map((v, i) => {
        if (i <= 4) {
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

export default ProfessorTags
