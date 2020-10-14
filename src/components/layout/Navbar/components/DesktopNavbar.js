import React, { useState } from 'react'
import useScrollPosition from '../../../../hooks/useScrollPosition'
import useWindowSize from '../../../../hooks/useWindowSize'
import ResultsSearchBar from '../../../../pages/Results/components/ResultsSearchBar'
import AddButton from './AddButton'
import NavbarMenu from './NavbarMenu'

const DesktopNavbar = () => {
  const { scrollPosition } = useScrollPosition()
  const { windowWidth } = useWindowSize()

  return (
    <div className={`navbar__container ${scrollPosition >= 52 ? 'scroll_navbar__container' : ''}`}>
      <div className='navbar__menu'>
        <div className='rtl'>
          <NavbarMenu />
        </div>
        <ResultsSearchBar scrollPosition={scrollPosition} windowWidth={windowWidth} />
        <AddButton />
      </div>
    </div>
  )
}

export default DesktopNavbar
