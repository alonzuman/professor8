import React, { useEffect, useState } from 'react'
import { Button, Dialog, ListItem, ListItemSecondaryAction, ListItemText, Checkbox, CircularProgress, DialogContent, TextField, FormGroup, Divider, IconButton, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import AddIcon from '@material-ui/icons/Add';
import heb from '../../../utils/translation/heb';

const SaveProfessor = ({ action }) => {
  const { lists, loading } = useSelector(state => state.saved)
  const [newName, setNewName] = useState('')
  const [selectedList, setSelectedList] = useState({})
  const [listsArr, setListsArr] = useState(lists || [])

  const handleCheck = v => {
    if (selectedList.name === v.name) {
      setSelectedList({})
    } else {
      setSelectedList(v)
    }
  }

  useEffect(() => setListsArr(lists), [lists])

  const handleAddList = name => {
    const newList = {
      name
    }
    setListsArr([...listsArr, newList])
    setSelectedList(newList)
    setNewName('')
  }

  return (
    <DialogContent>
      {listsArr?.length !== 0 &&
        <div className='mb-2'>
          <Typography variant='subtitle2'>{heb.existingLists}</Typography>
          {listsArr?.map((v, i) => {
            return (
              <ListItem key={i} button onClick={() => handleCheck(v)} className='list__item'>
                <ListItemText>{v.name}</ListItemText>
                <ListItemSecondaryAction>
                  <Checkbox onChange={() => handleCheck(v)} checked={selectedList.name === v.name} />
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </div>}
      <Typography variant='subtitle2'>{heb.createANewList}</Typography>
      <div className='flex align__center justify__between rtl'>
        <TextField className='full__width mt-1 mb-1' variant='outlined' size='small' dir='rtl' placeholder={heb.newListName} value={newName} onChange={e => setNewName(e.target.value)} />
        <IconButton size='small' className='bg-01 mr-1' disabled={newName.length === 0} onClick={() => handleAddList(newName)}><AddIcon /></IconButton>
      </div>
      <Button color='primary' variant='contained' disabled={!selectedList || loading} onClick={() => action({ list: selectedList })}>{loading ? <CircularProgress className='spinner__small' /> : heb.save}</Button>
    </DialogContent>
  )
}

export default SaveProfessor
