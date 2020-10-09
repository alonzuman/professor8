import { Button, DialogContent, FormGroup, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import heb from '../../utils/translation/heb'

const AddList = () => {
  const [name, setName] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    if (name) {
      console.log(name)
    }
  }

  return (
    <DialogContent>
      <form className='rtl' onSubmit={handleSubmit}>
        <FormGroup>
          <TextField placeholder={heb.newListNamePlaceholder} label={heb.newListName} variant='outlined' size='small' value={name} onChange={e => setName(e.target.value)} />
        </FormGroup>
        <Button className='mt-1' variant='contained' color='primary' disabled={!name} type='submit'>{heb.submit}</Button>
      </form>
    </DialogContent>
  )
}

export default AddList
