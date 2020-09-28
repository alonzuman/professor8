import { Button } from '@material-ui/core'
import React from 'react'
import { NavLink } from 'react-router-dom'
import heb from '../../utils/translation/heb'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer__container'>
      <NavLink className='footer__link' activeClassName='footer__link--active' to='/privacy-policy'>
        <Button>
          {heb.PP}
        </Button>
      </NavLink>
      <NavLink className='footer__link' activeClassName='footer__link--active' to='/terms-of-service'>
        <Button>
          {heb.TOS}
        </Button>
      </NavLink>
      <NavLink className='footer__link' activeClassName='footer__link--active' to='/about-us'>
        <Button>
          {heb.aboutUs}
        </Button>
      </NavLink>
    </div>
  )
}

export default Footer
