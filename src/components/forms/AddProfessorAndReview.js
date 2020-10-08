import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Step, StepLabel, Stepper } from '@material-ui/core';
import { validateStringInputs } from '../../utils';
import heb from '../../utils/translation/heb';
import { useDispatch, useSelector } from 'react-redux';
import { addProfessorAndReview } from '../../actions/professors';
import { useHistory } from 'react-router-dom';
import SchoolAndName from './AddProfessorAndReview/SchoolAndName';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import ReviewAndDetails from './AddProfessorAndReview/ReviewAndDetails';
import ContentAndTags from './AddProfessorAndReview/ContentAndTags';
import { setFeedback } from '../../actions';

const steps = [
  heb.generalInfo,
  heb.additionalInformation,
  heb.personalWords
]

const AddProfessorAndReview = ({ onClose }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { loading, newId } = useSelector(state => state.professors)
  const { uid } = useSelector(state => state.auth)
  const [name, setName] = useState('')
  const [author, setAuthor] = useState(heb.annonymous)
  const [school, setSchool] = useState('')
  const [content, setContent] = useState('')
  const [difficulty, setDifficulty] = useState(5)
  const [rating, setRating] = useState(5)
  const [attendance, setAttendance] = useState(false)
  const [wouldTakeAgain, setWouldTakeAgain] = useState(false)
  const [courses, setCourses] = useState([])
  const [tagsArray, setTagsArray] = useState([])
  const [activeStep, setActiveStep] = useState(0)

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option,
    limit: 30
  });

  const handleFirstStep = () => {
    if (school && name && courses) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      dispatch(setFeedback({
        type: 'warning',
        msg: heb.fillAllFields
      }))
    }
  }

  const handleSecondStep = () => {
    if (tagsArray.length !== 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      dispatch(setFeedback({
        type: 'warning',
        msg: heb.fillAllFields
      }))
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const professor = {
      uid,
      name,
      school,
      difficulty,
      tags: tagsArray,
      numberOfReviews: 0,
      courses,
      rating,
    }

    const review = {
      uid,
      author: author || heb.annonymous,
      rating,
      content,
      wouldTakeAgain,
      attendance,
      difficulty,
      courses,
      tags: tagsArray,
      downVotesArray: [],
      upVotesArray: []
    }

    if (validateStringInputs([name, school, content])) {
      await dispatch(addProfessorAndReview({ professor, review }))
      await onClose()
    } else {
      dispatch(setFeedback({
        severity: 'error',
        msg: heb.fillAllFields
      }))
    }
  }

  useEffect(() => {
    if (newId) {
      return history.push({
        pathname: `/professor/${newId}`
      })
    }
  }, [newId])

  return (
    <>
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    <form dir='rtl' onSubmit={handleSubmit}>
      {activeStep === 0 &&
      <SchoolAndName
        school={school}
        setSchool={setSchool}
        name={name}
        setName={setName}
        courses={courses}
        setCourses={setCourses}
        filterOptions={filterOptions}
        />}
      {activeStep === 1 &&
      <ReviewAndDetails
        attendance={attendance}
        setAttendance={setAttendance}
        wouldTakeAgain={wouldTakeAgain}
        setWouldTakeAgain={setWouldTakeAgain}
        tagsArray={tagsArray}
        setTagsArray={setTagsArray}
        filterOptions={filterOptions}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        rating={rating}
        setRating={setRating}
      />}
      {activeStep === 2 &&
      <ContentAndTags
        content={content}
        setContent={setContent}
        author={author}
        setAuthor={setAuthor}
      />}
    </form>
    {activeStep > 0 && <Button onClick={handleBack}>{heb.back}</Button>}
    {activeStep === 0 && <Button disabled={!name || !school || courses.length === 0} variant='contained' color='primary' className='mr-1' onClick={handleFirstStep}>{heb.next}</Button>}
    {activeStep === 1 && <Button disabled={tagsArray.length === 0} variant='contained' color='primary' className='mr-1' onClick={handleSecondStep}>{heb.next}</Button>}
    {activeStep === 2 &&
      <Button
        className='mr-1'
        disabled={loading}
        color='primary'
        variant='contained'
        onClick={handleSubmit}
      >{loading ? <CircularProgress className='spinner__small' /> : heb.submit}
      </Button>}
    </>
  )
}

export default AddProfessorAndReview
