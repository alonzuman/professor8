import React, { useState } from 'react'
import { FormControlLabel, MenuItem, Radio, RadioGroup, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { changeTheme } from '../../../../actions';
import heb from '../../../../utils/translation/heb';

const ThemeSelectionsMenu = () => {
  const theme = localStorage.getItem('theme')
  const [value, setValue] = useState(theme)
  const dispatch = useDispatch()

  const handleThemeChange = e => {
    dispatch(changeTheme(theme === 'light' ? 'dark' : 'light'))
    setValue(e.target.value)
  }

  return (
    <RadioGroup value={value} onChange={handleThemeChange}>
      <MenuItem className='pt-0 pb-0'>
        <FormControlLabel value='light' control={<Radio />} label={<Typography variant='subtitle2'>{heb.light}</Typography>} />
      </MenuItem>
      <MenuItem className='pt-0 pb-0'>
        <FormControlLabel value='dark' control={<Radio />} label={<Typography variant='subtitle2'>{heb.dark}</Typography>} />
      </MenuItem>
    </RadioGroup>
  )
}

export default ThemeSelectionsMenu
