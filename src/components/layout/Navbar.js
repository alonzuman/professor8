import { Button, FormControlLabel, Switch } from '@material-ui/core';
import React, { useState } from 'react';
import AddProfessorContainer from '../../containers/dialogs/AddProfessorAndReviewContainer';
import heb from '../../utils/translation/heb';
import AddIcon from '@material-ui/icons/Add';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import NavbarMenu from './NavbarMenu';
import { changeTheme } from '../../actions';
import Brightness4Icon from '@material-ui/icons/Brightness4';

const Navbar = () => {
  const { isAuth, loading } = useSelector(state => state.auth)
  const [addingProfessorAndReview, setAddingProfessorAndReview] = useState(false)
  const theme = localStorage.getItem('theme')
  const [checked, setChecked] = useState(theme === 'dark')
  const dispatch = useDispatch()

  const handleThemeChange = () => {
    dispatch(changeTheme(theme === 'light' ? 'dark' : 'light'))
    setChecked(!checked)
  }

  return (
    <div className='navbar__container'>
      <AddProfessorContainer open={addingProfessorAndReview} onClose={() => setAddingProfessorAndReview(false)} />
      <div className='navbar__menu'>
        <div dir='rtl'>
          <NavbarMenu loading={loading} />
          <FormControlLabel
            className='mr-1'
            control={<Switch checked={checked} onChange={handleThemeChange} />}
            label={<Brightness4Icon />}
          />
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

export default Navbar
