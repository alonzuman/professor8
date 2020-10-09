import { MenuItem } from '@material-ui/core'
import React from 'react'
import { NavLink } from 'react-router-dom'
import heb from '../../../../utils/translation/heb'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const MainMenu = ({ handleClose, anonymous, role, setMenu, handleSignOut }) => {
  return (
    <div className='menu__container'>
      <NavLink onClick={handleClose} exact activeClassName='menu__item--active' to='/'>
        <MenuItem>
          {heb.home}
        </MenuItem>
      </NavLink>
      {anonymous &&
        <NavLink onClick={handleClose} exact activeClassName='menu__item--active' to='/sign-in'>
          <MenuItem>
            {heb.signIn}
          </MenuItem>
        </NavLink>}
      {!anonymous && role >= 3 &&
        <NavLink onClick={handleClose} exact activeClassName='menu__item--active' to='/admin'>
          <MenuItem>
            {heb.manage}
          </MenuItem>
        </NavLink>}
      {!anonymous &&
        <NavLink onClick={handleClose} exact activeClassName='menu__item--active' to='/saved'>
          <MenuItem>
            {heb.savedProfessors}
          </MenuItem>
        </NavLink>}
      <div onClick={() => setMenu(1)}>
        <MenuItem className='menu__item--with-icon'>
          {heb.settings}
          <KeyboardArrowLeftIcon />
        </MenuItem>
      </div>
    </div>
  )
}

export default MainMenu
