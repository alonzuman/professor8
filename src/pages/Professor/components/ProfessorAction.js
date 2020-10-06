import React from 'react'
import { useSelector } from 'react-redux'
import EditButton from '../../../components/general/EditButton'
import SaveButton from '../../../components/general/SaveButton'

const ProfessorAction = ({ uid, role, professor, setEditing, anonymous, saved, setSaved }) => {
  if (anonymous || !uid || !role || !professor) {
    return null
  } else if (uid === professor?.uid || role >= 3) {
    return <EditButton onClick={setEditing} sticky={true} variant='contained' />
  } else {
    return <SaveButton saved={saved} setSaved={setSaved} variant='contained' />
  }
}

export default ProfessorAction
