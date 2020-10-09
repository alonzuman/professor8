import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import heb from '../../../utils/translation/heb';
import AddIcon from '@material-ui/icons/Add';
import './Navbar.css';
import { useSelector } from 'react-redux';
import NavbarMenu from './components/NavbarMenu';
import AddProfessorAndReviewContainer from '../../../containers/dialogs/AddProfessorAndReviewContainer';
import { Skeleton } from '@material-ui/lab';


const Navbar = () => {
  const { isAuth, loading } = useSelector(state => state.auth)
  const [addingProfessorAndReview, setAddingProfessorAndReview] = useState(false)

  if (loading || !isAuth) {
    return (
      <div className='navbar__container'>
        <div className='navbar__menu'>
          <Skeleton className='br-2' height={38} width={72} />
          <Skeleton className='br-2' height={38} width={120} />
        </div>
      </div>
    )
  } else {
    return (
      <div className='navbar__container'>
        <AddProfessorAndReviewContainer open={addingProfessorAndReview} onClose={() => setAddingProfessorAndReview(false)} />
        <div className='navbar__menu'>
          <div className='rtl'>
            <NavbarMenu loading={loading} />
          </div>
          {isAuth &&
          <Button className='add__btn ltr' color='primary' variant='outlined' onClick={() => setAddingProfessorAndReview(!addingProfessorAndReview)}>
            <AddIcon className='mr-1' />
            {heb.addReview}
          </Button>}
        </div>
      </div>
    )
  }
}

export default Navbar
