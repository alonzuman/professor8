import { Button, CircularProgress, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getProfessors } from '../actions/professors';
import DbControls from '../components/admin/DbControls';
import FiltersBar from '../components/general/FiltersBar';
import ProfessorsList from '../containers/ProfessorsList';

const Home = () => {
  const { filters, professors, loading } = useSelector(state => state.professors)
  const dispatch = useDispatch()

  const fetchData = () => {
    if (filters.name || filters.institution) {
      return dispatch(getProfessors())
    }
  }

  useEffect(() => { fetchData() }, [filters])

  return (
    <div className='page__container'>
      <FiltersBar />
      {/* <DbControls /> */}
    </div>
  )
}

export default Home
