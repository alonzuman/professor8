import { Avatar, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Menu from '@material-ui/core/Menu';
import './NavbarMenu.css'
import { signOut } from '../../../../actions';
import MainMenu from './MainMenu';
import SettingsMenu from './SettingsMenu';

// Icons
import MenuIcon from '@material-ui/icons/Menu';
import useScrollPosition from '../../../../hooks/useScrollPosition';

const NavbarMenu = () => {
  const [menu, setMenu] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const { avatar, firstName, anonymous, role } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { scrollPosition } = useScrollPosition()

  const handleOpen = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setMenu(0)
  }

  const handleSignOut = () => {
    dispatch(signOut())
    handleClose()
  }

  return (
    <>
      <Button className={`${scrollPosition >= 52 ? 'scroll_menu__button' : ''} menu__button`} onClick={handleOpen}>
        <Avatar src={avatar} alt={firstName} className='menu__avatar'>{firstName?.split('')[0]}</Avatar>
        <MenuIcon className={scrollPosition > 0 ? 'scroll_menu__icon' : 'menu__icon'} />
      </Button>
      <Menu className='menu__container rtl' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {menu === 0 && <MainMenu handleClose={handleClose} setMenu={setMenu} anonymous={anonymous} role={role} />}
        {menu === 1 && <SettingsMenu handleClose={handleClose} setMenu={setMenu} anonymous={anonymous} handleSignOut={handleSignOut} />}
      </Menu>
    </>
  )
}

export default NavbarMenu
