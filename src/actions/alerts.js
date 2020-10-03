export const clearAlert = () => {
  return {
    type: 'ALERTS/CLEAR_ONE'
  }
}

export const setAlert = ({ msg, type }) => async dispatch => {
  console.log('setting alert:')
  console.log(msg, type)

  dispatch({
    type: 'ALERTS/SET_ONE',
    payload: { msg, type }
  })
  setTimeout(() => {
    dispatch(clearAlert())
  }, 3500);
}
