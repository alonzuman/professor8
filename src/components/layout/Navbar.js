import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AddProfessorContainer from '../../containers/dialogs/AddProfessorContainer';
import './Navbar.css';

const Navbar = () => {
  const [addingProfessor, setAddingProfessor] = useState(false)

  return (
    <div className='navbar__container'>
      <AddProfessorContainer open={addingProfessor} onClose={() => setAddingProfessor(false)} />
      <div className='navbar__menu'>
        <NavLink className='navbar__link' to='/' >Home</NavLink>
        <Button onClick={() => setAddingProfessor(!addingProfessor)}>Add Professor</Button>
      </div>
    </div>
  )
}

export default Navbar
