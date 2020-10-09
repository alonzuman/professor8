import { FormGroup, TextField } from '@material-ui/core'
import React from 'react'
import heb from '../../../utils/translation/heb'

const ContentAndTags = ({ author, setAuthor, content, setContent }) => {
  return (
    <>
      <FormGroup className='form__group'>
        <TextField size='small' variant='outlined' label={heb.author} value={author} onChange={e => setAuthor(e.target.value)} />
      </FormGroup>
      <FormGroup className='form__group'>
        <TextField
          label={heb.content}
          multiline
          rows={4}
          variant='outlined'
          name='content'
          size='small'
          onChange={e => setContent(e.target.value)}
        />
      </FormGroup>
    </>
  )
}

export default ContentAndTags
