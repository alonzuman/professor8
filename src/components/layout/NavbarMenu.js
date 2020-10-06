import { Avatar, Button, Divider, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Menu from '@material-ui/core/Menu';
import { NavLink, useHistory } from 'react-router-dom'
import heb from '../../utils/translation/heb'
import './NavbarMenu.css'
import MenuIcon from '@material-ui/icons/Menu';
import { signOut } from '../../actions/auth';

const NavbarMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { avatar, firstName, anonymous, role } = useSelector(state => state.auth)
  const history = useHistory()
  const path = history.location.pathname;
  const dispatch = useDispatch()

  const handleOpen = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = () => {
    dispatch(signOut())
  }

  const handleLinkClick = path => {
    history.push({
      pathname: path
    })

    handleClose()
  }

  return (
    <div className='menu__container'>
      <Button className='menu__button' onClick={handleOpen}>
        <Avatar src={avatar} alt={firstName} className='menu__avatar'>{firstName?.split('')[0]}</Avatar>
        <MenuIcon className='menu__icon' />
      </Button>
      <Menu dir='rtl' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleLinkClick('/')} className={`nav__item ${path === '/' ? 'nav__item--active' : ''}`}>
          {heb.home}
        </MenuItem>
        {anonymous &&
        <MenuItem onClick={() => handleLinkClick('/sign-in')} className={`nav__item ${path === '/sign-in' ? 'nav__item--active' : ''}`}>
          {heb.signIn}
        </MenuItem>}
        {!anonymous && role >= 3 &&
        <MenuItem onClick={() => handleLinkClick('/admin')} className={`nav__item ${path === '/admin' ? 'nav__item--active' : ''}`}>
          {heb.manage}
        </MenuItem>}
        {!anonymous &&
        <MenuItem onClick={() => handleLinkClick('/saved-professors')} className={`nav__item ${path === '/admin' ? 'nav__item--active' : ''}`}>
          {heb.savedProfessors}
        </MenuItem>}
        {!anonymous &&
        <div>
          <Divider className='mt-1 mb-1' />
          <MenuItem className='nav__item' onClick={handleSignOut}>
            {heb.signOut}
          </MenuItem>
        </div>}
      </Menu>
    </div>
  )
}

export default NavbarMenu
