import React from 'react'
import useScrollPosition from '../../../../hooks/useScrollPosition'
import AddButton from './AddButton'
import NavbarMenu from './NavbarMenu'

const MobileNavbar = () => {
  const { scrollPosition } = useScrollPosition()

  return (
    <div className={`navbar__container ${scrollPosition >= 52 ? 'scroll_navbar__container' : ''}`}>
      <div className='navbar__menu'>
        <NavbarMenu />
        <AddButton />
      </div>
    </div>
  )
}

export default MobileNavbar
