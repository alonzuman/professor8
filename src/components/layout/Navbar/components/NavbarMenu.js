import { Avatar, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Menu from '@material-ui/core/Menu';
import './NavbarMenu.css'
import MenuIcon from '@material-ui/icons/Menu';
import { signOut } from '../../../../actions';
import MainMenu from './MainMenu';
import SettingsMenu from './SettingsMenu';

const NavbarMenu = () => {
  const [menu, setMenu] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const { avatar, firstName, anonymous, role } = useSelector(state => state.auth)
  const dispatch = useDispatch()

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
      <Button className='menu__button' onClick={handleOpen}>
        <Avatar src={avatar} alt={firstName} className='menu__avatar'>{firstName?.split('')[0]}</Avatar>
        <MenuIcon className='menu__icon' />
      </Button>
      <Menu className='menu__container rtl' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {menu === 0 && <MainMenu handleClose={handleClose} setMenu={setMenu} anonymous={anonymous} role={role} />}
        {menu === 1 && <SettingsMenu handleClose={handleClose} setMenu={setMenu} anonymous={anonymous} handleSignOut={handleSignOut} />}
      </Menu>
    </>
  )
}

export default NavbarMenu
