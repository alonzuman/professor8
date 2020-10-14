import React from 'react'
import AddButton from './AddButton'
import NavbarMenu from './NavbarMenu'

const MobileNavbar = () => {
  return (
    <div className='navbar__container'>
      <div className='navbar__menu'>
        <NavbarMenu />
        <AddButton />
      </div>
    </div>
  )
}

export default MobileNavbar
