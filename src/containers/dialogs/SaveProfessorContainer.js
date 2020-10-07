import { Button, Dialog, ListItem, ListItemSecondaryAction, ListItemText, Checkbox, CircularProgress, DialogContent, TextField, FormGroup, Divider, IconButton, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import heb from '../../utils/translation/heb'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close'

const SaveProfessorContainer = ({ open, onClose, action }) => {
  const { lists, loading } = useSelector(state => state.saved)
  const [newName, setNewName] = useState('')
  const [listName, setListName] = useState('')
  const [listsObj, setListsObj] = useState(lists || {})

  const handleCheck = v => {
    if (listName === v) {
      setListName('')
    } else {
      setListName(v)
    }
  }

  useEffect(() => setListsObj(lists), [lists])

  const handleAddList = name => {
    const newListsObj = {
      ...listsObj,
      [name]: []
    }
    setListsObj(newListsObj)
    setNewName('')
  }

  return (
    <Dialog dir='rtl' fullWidth maxWidth={'sm'} open={open} onClose={onClose}>
      <div className='header__container'>
        <Typography variant='h5'>{heb.saveProfessor}</Typography>
        <IconButton onClick={onClose} style={{ marginLeft: -8 }}><CloseIcon /></IconButton>
      </div>
      <DialogContent>
        <Typography variant='subtitle2'>{heb.existingLists}</Typography>
        {Object.keys(listsObj)?.map((v, i) => {
          return (
            <>
              <ListItem button onClick={() => handleCheck(v)} key={i} className='list__item'>
                <ListItemText>
                  {v}
                </ListItemText>
                <ListItemSecondaryAction>
                  <Checkbox onChange={() => handleCheck(v)} checked={listName === v} />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </>
          )
        })}
        <Typography className='mt-3' variant='subtitle2'>{heb.createANewList}</Typography>
        <div className='flex align__center justify__between rtl'>
          <TextField className='full__width mt-1 mb-1' variant='outlined' size='small' dir='rtl' placeholder={heb.newListName} value={newName} onChange={e => setNewName(e.target.value)} />
          <IconButton disabled={newName.length === 0} onClick={() => handleAddList(newName)}><AddIcon /></IconButton>
        </div>
        <Button color='primary' variant='contained' disabled={!listName || loading} onClick={() => action(listName)}>{loading ? <CircularProgress className='spinner__small' /> : heb.save}</Button>
      </DialogContent>
    </Dialog>
  )
}

export default SaveProfessorContainer
