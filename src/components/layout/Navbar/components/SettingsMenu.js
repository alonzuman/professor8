import { Divider, IconButton, MenuItem } from '@material-ui/core'
import React from 'react'
import heb from '../../../../utils/translation/heb';
import ThemeSelectionsMenu from './ThemeSelectionsMenu';

// Icons
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useSelector } from 'react-redux';

const SettingsMenu = ({ handleSignOut, setMenu, handleClose, anonymous }) => {
  const { theme } = useSelector(state => state.theme)

  const handleSignOutClick = () => {
    handleSignOut()
    handleClose()
  }

  const iconButtonStyle = {
    backgroundColor: theme === 'dark' ? '#3a3b3d' : '#f0f2f5'
  }

  return (
    <div className='menu__container'>
      <IconButton size='small' className='mr-1 mb-1' onClick={() => setMenu(0)}>
        <KeyboardArrowRightIcon />
      </IconButton>

      <div className='menu__subtitle'>
        <IconButton size='small' style={iconButtonStyle}>
          <Brightness4Icon />
        </IconButton>
        <span className='flex--2 mr-1'>
          {heb.appearanceSettings}
        </span>
      </div>
      <ThemeSelectionsMenu />
      {!anonymous &&
        <div className='menu__item'>
          <Divider className='mt-1 mb-1' />
          <MenuItem className='menu__item' onClick={handleSignOutClick}>
            <IconButton size='small' style={iconButtonStyle}>
              <ExitToAppIcon />
            </IconButton>
            <span className='flex--2 mr-2'>{heb.signOut}</span>
          </MenuItem>
        </div>}
    </div>
  )
}

export default SettingsMenu
