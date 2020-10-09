export const setTheme = () => async dispatch => {
  const theme = localStorage.getItem('theme')
  dispatch({
    type: 'THEME/LOADING'
  })

  document.getElementById('root').className = theme ? theme : 'light'
  setBackgroundColor(theme)

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
  setBackgroundColor(newTheme)
  localStorage.setItem('theme', newTheme)
  document.getElementById('root').className = newTheme

  dispatch({
    type: 'THEME/SET_THEME',
    payload: newTheme
  })
}

const setBackgroundColor = (theme) => {
  document.body.style.backgroundColor = (theme === 'light' || !theme) ? '#f0f2f5' : '#18191a'
}
