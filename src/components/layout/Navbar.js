import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import AddProfessorContainer from '../../containers/dialogs/AddProfessorAndReviewContainer';
import heb from '../../utils/translation/heb';
import AddIcon from '@material-ui/icons/Add';
import './Navbar.css';
import { useSelector } from 'react-redux';
import NavbarMenu from './NavbarMenu';

const Navbar = () => {
  const { isAuth, loading } = useSelector(state => state.auth)
  const [addingProfessorAndReview, setAddingProfessorAndReview] = useState(false)

  return (
    <div className='navbar__container'>
      <AddProfessorContainer open={addingProfessorAndReview} onClose={() => setAddingProfessorAndReview(false)} />
      <div className='navbar__menu'>
        <div dir='rtl'>
          <NavbarMenu loading={loading} />
        </div>
        {isAuth &&
        <Button className='add__btn' color='primary' variant='outlined' onClick={() => setAddingProfessorAndReview(!addingProfessorAndReview)}>
          <AddIcon className='mr-1' />
          {heb.addReview}
        </Button>}
      </div>
    </div>
  )
}

export default Navbar
