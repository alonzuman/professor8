import React from 'react'
import './AutoComplete.css'
import { ClickAwayListener, MenuItem } from '@material-ui/core'

const AutoComplete = ({ suggestions, show, setShow, search, onClick }) => {
  if (show && suggestions.length > 0 ) {
    return (
      <ClickAwayListener onClickAway={() => setShow(false)}>
        <div className='auto_complete__container'>
          {suggestions?.map((suggestion, i) => {
            if (i <= 9) {
              return <MenuItem tabIndex={0} onClick={() => onClick(suggestion.name)} key={i}>{suggestion.name}</MenuItem>
            }
          })}
        </div>
      </ClickAwayListener>
    )
  } else {
    return <div/>
  }
}

export default AutoComplete
