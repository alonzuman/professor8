import { IconButton } from '@material-ui/core'
import React from 'react'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const SaveButton = ({ sticky = false, saved, setSaved, variant }) => {
  const buttonStyle = {
    boxShadow: variant === 'contained' ? '0px 0px 10px #00000015' : '',
    position: sticky ? 'sticky' : 'relative',
    top: sticky ? '16px' : '',
    zIndex: 9,
    backgroundColor: 'var(--bg-00)'
  }

  return (
    <IconButton className='icon__button' style={buttonStyle} onClick={setSaved}>
      {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
    </IconButton>
  )
}

export default SaveButton
