export const setAlert = ({ msg, severity }) => async dispatch => {
  dispatch({
    type: 'ALERTS/SET_ONE',
    payload: {
      msg,
      severity
    }
  })
  setTimeout(() => {
    dispatch(clearAlert())
  }, 3000);
}

export const clearAlert = () => async dispatch => {
  dispatch({
    type: 'ALERTS/CLEAR_ONE'
  })
}
