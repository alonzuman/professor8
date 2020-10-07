import React from 'react'
import './SavedListCard.css'

const SavedListCard = ({ name }) => {
  return (
    <div className='saved_list_card__container'>
      <p>{name}</p>
    </div>
  )
}

export default SavedListCard
