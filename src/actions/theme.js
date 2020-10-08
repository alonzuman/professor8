export const setTheme = () => async dispatch => {
  const theme = localStorage.getItem('theme')
  dispatch({
    type: 'THEME/LOADING'
  })

  document.getElementById('root').className = theme ? theme : 'light'

  if (!theme) {
    localStorage.setItem('theme', 'light')
    dispatch({
      type: 'THEME/SET_THEME',
      payload: 'light'
    })
  } else {
    dispatch({
      type: 'THEME/CLEAR_LOADING'
    })
  }
}

export const changeTheme = newTheme => async dispatch => {
  dispatch({
    type: 'THEME/LOADING'
  })
  localStorage.setItem('theme', newTheme)
  document.getElementById('root').className = newTheme

  dispatch({
    type: 'THEME/SET_THEME',
    payload: newTheme
  })
}
