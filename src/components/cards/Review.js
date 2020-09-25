import React from 'react'

const Review = ({ review }) => {
  const { content, rating } = review
  console.log(review)

  return (
    <div>
      <p>{content}</p>
      <h3>{rating}</h3>
    </div>
  )
}

export default Review
