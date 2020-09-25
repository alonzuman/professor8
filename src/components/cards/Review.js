import { ListItem, Paper } from '@material-ui/core'
import React from 'react'
import './Review.css'

const Review = ({ review }) => {
  const { content, rating } = review
  console.log(review)
  return (
    <Paper className='review_card__container'>
      <ListItem className='review_card__content' button>
        <p>{content}</p>
        <h3>{rating}</h3>
      </ListItem>
    </Paper>
  )
}

export default Review
