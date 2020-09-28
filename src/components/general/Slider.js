import { Typography } from '@material-ui/core'
import React from 'react'
import './Slider.css'
import StarIcon from '@material-ui/icons/Star';

const Slider = ({ min = 1, max = 5, name, onChange, value }) => {
  return (
    <div className='slider__container flex align__center justify__between'>
      <StarIcon color='primary' className='ml-5' />
      <Typography className='mw-fit' dir='ltr' variant='h3'>{value} / 5</Typography>
      <input className='slider__rail mr-3' type='range' min={min} max={max} name={name} onChange={onChange} />
    </div>
  )
}

export default Slider
