import { Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AddProfessorContainer from '../../containers/dialogs/AddProfessorContainer';
import heb from '../../utils/translation/heb';
import './Navbar.css';

const Navbar = () => {
  const [addingProfessor, setAddingProfessor] = useState(false)

  return (
    <div className='navbar__container'>
      <AddProfessorContainer open={addingProfessor} onClose={() => setAddingProfessor(false)} />
      <div className='navbar__menu'>
        <Button variant='outlined' onClick={() => setAddingProfessor(!addingProfessor)}>{heb.addProfessor}</Button>
        <NavLink className='navbar__link' to='/'>
          <Button>
            {heb.home}
          </Button>
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar
