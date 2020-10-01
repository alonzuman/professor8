import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AddProfessorContainer from '../../containers/dialogs/AddProfessorAndReviewContainer';
import heb from '../../utils/translation/heb';
import AddIcon from '@material-ui/icons/Add';
import './Navbar.css';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { isAuth, loading, role, anonymous } = useSelector(state => state.auth)
  const [addingProfessorAndReview, setAddingProfessorAndReview] = useState(false)

  if (loading || !isAuth) {
    return <div className='navbar__container'/>
  } else {
    return (
      <div className='navbar__container'>
        <AddProfessorContainer open={addingProfessorAndReview} onClose={() => setAddingProfessorAndReview(false)} />
        <div className='navbar__menu'>
          {isAuth &&
          <Button className='add__btn' color='primary' variant='outlined' onClick={() => setAddingProfessorAndReview(!addingProfessorAndReview)}>
            <AddIcon className='mr-1' />
            {heb.addReview}
          </Button>}
          <div dir='rtl'>
            <NavLink activeClassName='hidden' className='navbar__link' exact to='/'>
              <Button>
                {heb.home}
              </Button>
            </NavLink>
            {anonymous &&
            <NavLink className='navbar__link' exact to='/sign-in'>
              <Button>
                {heb.signIn}
              </Button>
            </NavLink>}
            {role >= 3 &&
            <NavLink className='navbar__link' exact to='/admin'>
              <Button>
                {heb.manage}
              </Button>
            </NavLink>}
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar
