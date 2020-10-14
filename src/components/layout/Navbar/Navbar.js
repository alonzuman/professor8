import React from 'react';
import './Navbar.css';
import { useSelector } from 'react-redux';
import DesktopNavbar from './components/DesktopNavbar';
import MobileNavbar from './components/MobileNavbar';
import useWindowSize from '../../../hooks/useWindowSize';

const Navbar = () => {
  const { isAuth } = useSelector(state => state.auth)
  const { windowWidth } = useWindowSize()




  if (isAuth) {
    if (windowWidth > 768) {
      return <DesktopNavbar />
    } else {
      return <MobileNavbar />
    }
  } else {
    return <div className='mh-52' />
  }
}

export default Navbar
