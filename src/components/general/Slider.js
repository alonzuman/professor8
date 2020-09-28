import React from 'react'

const Slider = ({ min = 1, max = 5, name, onChange }) => {
  return <input type='range' min={min} max={max} name={name} onChange={onChange} />
}

export default Slider
