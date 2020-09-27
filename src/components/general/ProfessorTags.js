import { Chip } from '@material-ui/core'
import { Sort } from '@material-ui/icons'
import React from 'react'

const ProfessorTags = ({ tags, loading }) => {
  const chipStyle = {
    width: 80,
    marginLeft: 8
  }

  return (
    <div className='page__section flex flex__wrap--wrap'>
      {loading && !tags && [0, 0, 0, 0].map((v, i) => <Chip className='ml-1 chip--big mb-1' style={chipStyle} key={i} />)}
      {!loading && tags && Object.keys(tags)?.sort((a, b) => { return tags[b] - tags[a] }).map((v, i) => {
        if (i <= 4) return <Chip className='width__fit--content mb-1 ml-1 chip--big' color='primary' label={`${v} (${tags[v]})`} key={i} />
      })}
    </div>
  )
}

export default ProfessorTags
