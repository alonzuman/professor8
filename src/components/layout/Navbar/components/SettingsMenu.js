import { Divider, IconButton, MenuItem, Typography } from '@material-ui/core'
import React from 'react'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import heb from '../../../../utils/translation/heb';
import ThemeSelectionsMenu from './ThemeSelectionsMenu';

const SettingsMenu = ({ handleSignOut, setMenu, handleClose, anonymous }) => {
  const handleSignOutClick = () => {
    handleSignOut()
    handleClose()
  }

  return (
    <div className='menu__container'>
      <IconButton size='small' className='mr-1 mb-1' onClick={() => setMenu(0)}>
        <KeyboardArrowRightIcon />
      </IconButton>

      <div className='menu__subtitle'>
        <Brightness4Icon className='ml-1' />
        <Typography variant='subtitle2'>{heb.appearanceSettings}</Typography>
      </div>
      <ThemeSelectionsMenu />
      {!anonymous &&
        <div className='menu__item'>
          <Divider className='mt-1 mb-1' />
          <MenuItem className='menu__item' onClick={handleSignOutClick}>
            {heb.signOut}
          </MenuItem>
        </div>}
    </div>
  )
}

export default SettingsMenu
