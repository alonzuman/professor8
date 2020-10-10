import { IconButton, MenuItem } from '@material-ui/core'
import React from 'react'
import { NavLink } from 'react-router-dom'
import heb from '../../../../utils/translation/heb'

// Icons
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import SettingsIcon from '@material-ui/icons/Settings';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useSelector } from 'react-redux';

const MainMenu = ({ handleClose, anonymous, role, setMenu }) => {
  const { theme } = useSelector(state => state.theme)

  const iconButtonStyle = {
    backgroundColor: theme === 'dark' ? '#3a3b3d' : '#f0f2f5'
  }

  return (
    <div className='menu__container'>
      <NavLink onClick={handleClose} exact activeClassName='menu__item--active' to='/'>
        <MenuItem>
        <IconButton size='small' style={iconButtonStyle}>
          <HomeIcon />
        </IconButton>
          <span className='flex--2 mr-2'>{heb.home}</span>
        </MenuItem>
      </NavLink>
      {anonymous &&
        <NavLink onClick={handleClose} exact activeClassName='menu__item--active' to='/sign-in'>
          <MenuItem>
          <IconButton size='small' style={iconButtonStyle}>
            <AccountCircleIcon />
          </IconButton>
            <span className='flex--2 mr-2'>{heb.signIn}</span>
          </MenuItem>
        </NavLink>}
      {!anonymous && role >= 3 &&
        <NavLink onClick={handleClose} exact activeClassName='menu__item--active' to='/admin'>
          <MenuItem>
          <IconButton size='small' style={iconButtonStyle}>
            <SupervisorAccountIcon />
          </IconButton>
            <span className='flex--2 mr-2'>{heb.manage}</span>
          </MenuItem>
        </NavLink>}
      {!anonymous &&
        <NavLink onClick={handleClose} exact activeClassName='menu__item--active' to='/saved-lists'>
          <MenuItem>
          <IconButton size='small' style={iconButtonStyle}>
            <BookmarkIcon />
          </IconButton>
            <span className='flex--2 mr-2'>{heb.savedProfessors}</span>
          </MenuItem>
        </NavLink>}
      <div onClick={() => setMenu(1)}>
        <MenuItem className='menu__item--with-icon'>
          <IconButton size='small' style={iconButtonStyle}>
            <SettingsIcon />
          </IconButton>
          <span className='flex--2 mr-2'>{heb.settings}</span>
          <KeyboardArrowLeftIcon />
        </MenuItem>
      </div>
    </div>
  )
}

export default MainMenu
