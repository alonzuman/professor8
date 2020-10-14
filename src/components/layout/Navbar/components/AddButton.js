import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import AddProfessorAndReviewContainer from '../../../../containers/dialogs/AddProfessorAndReviewContainer'
import heb from '../../../../utils/translation/heb'

const AddButton = () => {
  const [addingProfessorAndReview, setAddingProfessorAndReview] = useState(false)

  return (
    <>
      <AddProfessorAndReviewContainer open={addingProfessorAndReview} onClose={() => setAddingProfessorAndReview(false)} />
      <Button className='add__btn ltr' color='primary' variant='outlined' onClick={() => setAddingProfessorAndReview(!addingProfessorAndReview)}>
        <AddIcon className='mr-1' />
        {heb.addReview}
      </Button>
    </>
  )
}

export default AddButton
