import { IconButton } from '@material-ui/core'
import React from 'react'

// Icons
import EditIcon from '@material-ui/icons/Edit';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const ProfessorAction = ({ uid, role, professor, setEditing, anonymous, saved, setSaved, setSaving }) => {
  if (anonymous || !uid || !role || !professor) {
    return null
  } else if (uid === professor?.uid || role >= 3) {
    return (
      <div className='flex__group'>
        <IconButton  className='bg-02 ml-1' onClick={setEditing}><EditIcon /></IconButton>
        <IconButton  className='bg-02' onClick={setSaving}>{saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}</IconButton>
      </div>
    )
  } else {
    return <IconButton  className='bg-02' onClick={setSaving}>{saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}</IconButton>
  }
}

export default ProfessorAction
