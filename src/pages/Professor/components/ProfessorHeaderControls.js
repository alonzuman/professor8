import React from 'react'
import BackButton from '../../../components/general/BackButton'
import ProfessorAction from './ProfessorAction'

const ProfessorHeaderControls = ({ saved, handleSave, setSaving, anonymous, uid, professor, setEditing, role }) => {
  return (
    <div className='flex justify__between pr-2 pl-2'>
      <BackButton sticky={true} variant='contained' />
      <ProfessorAction
        saved={saved}
        setSaving={setSaving}
        anonymous={anonymous}
        uid={uid}
        professor={professor}
        setEditing={() => setEditing(true)}
        role={role}
      />
    </div>
  )
}

export default ProfessorHeaderControls
