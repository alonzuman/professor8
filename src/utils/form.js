export const validateStringInput = input => input.trim() === '' ? false : true

export const validateStringInputs = arr => {
  let i;
  arr.forEach(v => {
    if (v?.trim() === '') {
      i = 0;
    } else {
      i === 0 ? i = 0 : i = 1
    }
  })
  return (i !== 0 )
}

export const validateArrays = arrays => {
  let i
  arrays.forEach(v => {
    if (v?.length === 0) {
      i = 0
    } else {
      i === 0 ? i = 0 : i = 1
    }
  })
  return (i !== 0)
}

export const validateNumbers = numbers => {
  let i;
  numbers.forEach(v => {
    if (!v) {
      i = 0
    } else {
      i === 0 ? i = 0 : i = 1
    }
  })
  return (i !== 0)
}
